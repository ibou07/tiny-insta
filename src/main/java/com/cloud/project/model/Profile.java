package com.cloud.project.model;

import java.util.Date;

/**
 * Google user profile
 */
public class Profile {
    /**
     * Google user id
     */
    public String id;

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
}
