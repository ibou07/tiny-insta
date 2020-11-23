package com.cloud.project;

import java.util.*;

import com.cloud.project.fixtures.Data;
import com.cloud.project.model.Post;
import com.cloud.project.model.Profile;
import com.cloud.project.utlil.Config;
import com.cloud.project.utlil.Util;
import com.google.api.server.spi.auth.common.User;
import com.google.api.server.spi.config.*;
import com.google.api.server.spi.config.ApiMethod.HttpMethod;
import com.google.api.server.spi.response.CollectionResponse;
import com.google.api.server.spi.response.UnauthorizedException;

import com.google.appengine.api.datastore.*;
import com.google.appengine.api.datastore.Entity;
import endpoints.repackaged.com.google.gson.JsonObject;

@Api(name = "tinyinsta",
     version = "v1",
     audiences = "379066709774-4eab5t61a8d2emi9nd877ak9lt0jhr7r.apps.googleusercontent.com",
  	 clientIds = "379066709774-4eab5t61a8d2emi9nd877ak9lt0jhr7r.apps.googleusercontent.com",
     namespace =
     @ApiNamespace(
		   ownerDomain = "helloworld.example.com",
		   ownerName = "helloworld.example.com",
		   packagePath = "")
     )

public class ApiEndPoint {

	/**
	 * Get user profile by key
	 * @param key
	 * @return
	 * @throws UnauthorizedException
	 */
	@ApiMethod(name = "retrieveProfileByKey", httpMethod = HttpMethod.GET)
	public Entity retrieveProfileByKey(@Named("userKey") String key) {
		return Profile.findByKey(key);
	}

	/**
	 * Get user profile by id
	 * @param userId
	 * @return
	 * @throws UnauthorizedException
	 */
	@ApiMethod(name = "retrieveProfileById", httpMethod = HttpMethod.GET)
	public Entity retrieveProfileById(@Named("userId") String userId) {
		return Profile.findById(userId);
	}


	/**
	 * Create a profile for a user
	 * @param user
	 * @param profile
	 * @return
	 * @throws UnauthorizedException
	 */
	@ApiMethod(name = "createprofile", httpMethod = HttpMethod.POST)
	public Entity createprofile(User user, Profile profile) throws UnauthorizedException {
		if (user == null) {
			throw new UnauthorizedException("Invalid credentials");
		}
		Entity entity = new Entity(Profile.class.getCanonicalName(),
				Long.MAX_VALUE-(new Date()).getTime()+ Util.normalize(user.getEmail()));

		entity.setProperty("googleId", user.getId());
		entity.setProperty("pseudo", profile.pseudo);
		entity.setProperty("givenName", profile.givenName);
		entity.setProperty("familyName", profile.familyName);
		entity.setProperty("imageUrl", profile.imageUrl);
		entity.setProperty("email", user.getEmail());
		entity.setProperty("subscribers", new ArrayList<>());
		entity.setProperty("created_at", new Date());

		DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
		Transaction txn = datastore.beginTransaction();

		datastore.put(entity);

		txn.commit();

		Data.init(entity.getKey().getName());
		return entity;
	}

	@ApiMethod(name = "posts", httpMethod = HttpMethod.GET)
	public CollectionResponse<Entity> posts(@Named("googleId") String googleId,@Nullable @Named("userKey") String userKey, @Nullable @Named("next") String cursorString) {
		if(userKey == null){
			Entity profile = Profile.findById(googleId);
			userKey = profile.getKey().getName();
		}
		Query q = new Query(Post.class.getCanonicalName())
				.setFilter(new Query.FilterPredicate("author", Query.FilterOperator.EQUAL, userKey));

		// https://cloud.google.com/appengine/docs/standard/python/datastore/projectionqueries#Indexes_for_projections
		//q.addProjection(new PropertyProjection("body", String.class));
		//q.addProjection(new PropertyProjection("date", java.util.Date.class));
		//q.addProjection(new PropertyProjection("likec", Integer.class));
		//q.addProjection(new PropertyProjection("url", String.class));

		// looks like a good idea but...
		// generate a DataStoreNeedIndexException ->
		// require compositeIndex on owner + date
		// Explosion combinatoire.
		q.addSort("created_at", Query.SortDirection.DESCENDING);

		DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
		PreparedQuery pq = datastore.prepare(q);

		FetchOptions fetchOptions = FetchOptions.Builder.withLimit(Config.FETCH_POST_LIMIT);

		if (cursorString != null) {
			fetchOptions.startCursor(Cursor.fromWebSafeString(cursorString));
		}

		QueryResultList<Entity> results = pq.asQueryResultList(fetchOptions);
		cursorString = results.getCursor().toWebSafeString();

		return CollectionResponse.<Entity>builder().setItems(results).setNextPageToken(cursorString).build();

	}

	/**
	 * Remove post by key
	 * @param postKey
	 * @return
	 * @throws UnauthorizedException
	 */
	@ApiMethod(name = "postdelete", httpMethod = HttpMethod.GET)
	public Object postdelete(@Named("postKey") String postKey) {
		Entity post = Post.findByKey(postKey);
		JsonObject jsonResponse = new JsonObject();
		if(post == null){
			jsonResponse.addProperty("status", "failed");
			jsonResponse.addProperty("message", "User not found");
		}else{
			Post.delete(post.getKey());
			jsonResponse.addProperty("status", "success");
			jsonResponse.addProperty("message", "Post deleted");
		}
		return jsonResponse.toString();
	}


}
