package com.cloud.project.model;

import com.google.appengine.api.datastore.*;
import com.google.appengine.api.users.User;

import java.util.*;

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

        return find("__key__", encodedKey);
    }

    public static Entity follow(String followed, String follower){
        Entity profile = Profile.findById(followed);
        Map properties = profile.getProperties();
        ArrayList<String> subscribers= (ArrayList<String>) properties.get("subscribers");
        if(subscribers == null)
            subscribers = new ArrayList<>();
        subscribers.add(follower);
        profile.setProperty("subscribers", subscribers);
        Long counter = (Long) properties.get("subscriberCounter");
        profile.setProperty("subscriberCounter", counter+1);
        DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
        Transaction txn = datastore.beginTransaction();

        datastore.put(profile);

        txn.commit();

        return profile;
    }

    public static Entity unfollow(String followed, String follower){
        Entity profile = Profile.findById(followed);
        Map properties = profile.getProperties();
        ArrayList<String> subscribers= (ArrayList<String>) properties.get("subscribers");
        if(subscribers == null)
            subscribers = new ArrayList<>();
        if(subscribers.contains(follower)){
            subscribers.remove(follower);
            profile.setProperty("subscribers", subscribers);
            Long counter = (Long) properties.get("subscriberCounter");
            profile.setProperty("subscriberCounter", counter-1);
            DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
            Transaction txn = datastore.beginTransaction();

            datastore.put(profile);

            txn.commit();
        }

        return profile;
    }
}
