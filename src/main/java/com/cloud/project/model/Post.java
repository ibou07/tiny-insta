package com.cloud.project.model;

import com.google.appengine.api.datastore.Key;

import java.util.Date;

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
}
