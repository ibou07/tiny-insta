package com.cloud.project;

import java.util.*;

import com.cloud.project.model.Profile;
import com.google.api.server.spi.auth.common.User;
import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiMethod.HttpMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.api.server.spi.config.Named;
import com.google.api.server.spi.response.CollectionResponse;
import com.google.api.server.spi.response.UnauthorizedException;

import com.google.appengine.api.datastore.*;
import com.google.appengine.api.datastore.Entity;

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
	 * Get a profile for a user
	 * @param userId
	 * @return
	 * @throws UnauthorizedException
	 */
	@ApiMethod(name = "retrieveProfile", httpMethod = HttpMethod.GET)
	public Entity retrieveProfile(@Named("userId") String userId) {

		Query q = new Query(Profile.class.getCanonicalName()).setFilter(
				new Query.FilterPredicate("id", Query.FilterOperator.EQUAL, userId));

		DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
		PreparedQuery preparedQuery = datastore.prepare(q);
		Optional<Entity> result = preparedQuery.asList(FetchOptions.Builder.withDefaults()).stream().findFirst();

		return result.orElse(null);
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
		Entity entity = new Entity(Profile.class.getCanonicalName(), Long.MAX_VALUE-(new Date()).getTime()+":"+user.getEmail());

		entity.setProperty("id", user.getId());
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

		return entity;
	}



}
