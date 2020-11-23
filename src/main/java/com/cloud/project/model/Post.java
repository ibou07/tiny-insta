package com.cloud.project.model;

import com.google.appengine.api.datastore.*;

import java.util.Date;
import java.util.Optional;

/**
 * Google user profile
 */
public class Post {
    /**
     * Author key
     */
    String author;

    /**
     * Post description
     */
    String description;
    /**
     * Post image name
     */
    public String imageName;

    /**
     * Post image url
     */
    public String imageURL;

    /**
     * Like counter
     */
    Integer likeCounter;

    /**
     * Date of post
     */
    public Date created_at;


    /**
     * Get single post by specific field
     * @param field
     * @param value
     * @return
     */
    private static Entity find(String field, Object value) {
        Query q = new Query(Post.class.getCanonicalName()).setFilter(
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
        return  find("postId", id);
    }

    /**
     * Get user profile by key
     * @param key
     * @return
     */
    public static Entity findByKey(String key) {
        Key encodedKey = KeyFactory.createKey(Post.class.getCanonicalName(), key);
        return find("__key__", encodedKey);
    }

    /***
     * Delete single post by key
     * @param key
     */
    public static void delete(Key key){
        DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
        datastore.delete(key);
    }
}
