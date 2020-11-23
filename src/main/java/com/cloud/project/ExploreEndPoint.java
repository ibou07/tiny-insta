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

@Api(name = Config.API_NAME,
        version = Config.API_VERSION,
        audiences = Config.API_AUDIENCES,
        clientIds = Config.API_CLIENTID,
        namespace =
        @ApiNamespace(
                ownerDomain = Config.OWNERDOMAIN,
                ownerName = Config.OWNERNAME,
                packagePath = Config.PACKAGE_PATH)
)
public class ExploreEndPoint {
    @ApiMethod(name = "users", httpMethod = HttpMethod.GET)
    public CollectionResponse<Entity> users(User user, @Nullable @Named("keyword") String keyword,
                                            @Nullable @Named("next") String cursorString) throws UnauthorizedException {
        if (user == null) {
            throw new UnauthorizedException("Invalid credentials");
        }
        Query q = new Query(Profile.class.getCanonicalName())
                .setFilter(new Query.FilterPredicate("givenName",
                        Query.FilterOperator.GREATER_THAN_OR_EQUAL, keyword))
                .setFilter(new Query.FilterPredicate("givenName",
                        Query.FilterOperator.LESS_THAN, keyword + "\ufffd"))
                .setFilter(new Query.FilterPredicate("googleId",
                        Query.FilterOperator.NOT_EQUAL, user.getId()));
        DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
        PreparedQuery pq = datastore.prepare(q);

        FetchOptions fetchOptions = FetchOptions.Builder.withLimit(Config.FETCH_PROFILE_LIMIT);

        QueryResultList<Entity> results = pq.asQueryResultList(fetchOptions);
        if (cursorString != null) {
            fetchOptions.startCursor(Cursor.fromWebSafeString(cursorString));
            cursorString = results.getCursor().toWebSafeString();
        }


        return CollectionResponse.<Entity>builder().setItems(results).setNextPageToken(cursorString).build();
    }
}
