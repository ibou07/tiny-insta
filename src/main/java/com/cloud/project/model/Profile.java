package com.cloud.project.model;

import com.google.appengine.api.datastore.*;

import java.util.Date;
import java.util.Optional;

import static com.google.appengine.api.datastore.KeyFactory.createKey;

/**
 * Google user profile
 */
public class Profile {
    /**
     * Google user id
     */
    public String googleId;

    /**
     * User pseudo"
     */
    public String pseudo;

    /**
     * User given name
     */
    public String givenName;

    /**
     * User family name
     */
    public String familyName;

    /**
     * User profile image url
     */
    public String imageUrl;

    /**
     * User email
     */
    public String email;

    /**
     * Date of subscription
     */
    public Date created_at;

    /**
     * Get single user profile by specific field
     * @param field
     * @param value
     * @return
     */
    private static Entity find(String field, Object value) {
        Query q = new Query(Profile.class.getCanonicalName()).setFilter(
                new Query.FilterPredicate(field, Query.FilterOperator.EQUAL, value));

        DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
        PreparedQuery preparedQuery = datastore.prepare(q);
        Optional<Entity> result = preparedQuery.asQueryResultList(FetchOptions.Builder.withDefaults()).stream().findFirst();

        return result.orElse(null);
    }

    /**
     * Get user profile by id
     * @param id
     * @return
     */
    public static Entity findById(String id) {
        return  find("googleId", id);
    }

    /**
     * Get user profile by key
     * @param key
     * @return
     */
    public static Entity findByKey(String key) {
        Key encodedKey = KeyFactory.createKey(Profile.class.getCanonicalName(), key);
//        Query q = new Query(Profile.class.getCanonicalName()).setFilter(
//                new Query.FilterPredicate("__key__", Query.FilterOperator.EQUAL, encodedKey));
//
//        DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
//        PreparedQuery preparedQuery = datastore.prepare(q);
//        Optional<Entity> result = preparedQuery.asList(FetchOptions.Builder.withDefaults()).stream().findFirst();

        return find("__key__", encodedKey);
    }
}
