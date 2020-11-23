package com.cloud.project.fixtures;

import com.cloud.project.model.Post;
import com.cloud.project.model.Profile;
import com.cloud.project.utlil.Util;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.Transaction;

import java.util.Date;
import java.util.ArrayList;

public class Data {
    public static void secondUser(){
        Entity entity = new Entity(Profile.class.getCanonicalName(),
                Long.MAX_VALUE-(new Date()).getTime()+ Util.normalize("ducode01@gmail.com"));

        entity.setProperty("googleId","116948394193600658389");
        entity.setProperty("pseudo","ducode01");
        entity.setProperty("givenName", "Ducode01");
        entity.setProperty("familyName", "Ducode01");
        entity.setProperty("imageUrl", "https://lh3.googleusercontent.com/a-/AOh14GgwhxwalJ1jflVPpAxBUiKLIkwcz8U_qr8SgAoR=s96-c");
        entity.setProperty("email", "ducode01@gmail.com");
        entity.setProperty("subscriberCounter", 0);
        entity.setProperty("subscribers", new ArrayList<>());
        entity.setProperty("created_at", new Date());

        DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
        Transaction txn = datastore.beginTransaction();

        datastore.put(entity);

        txn.commit();

        String imageUrl = "https://media.istockphoto.com/photos/collection-of-different-tropical-leaves-elements-set-leaf-on-isolated-picture-id1022855540";
        Entity post = new Entity(Post.class.getCanonicalName(),
                Long.MAX_VALUE - (new Date()).getTime() + entity.getKey().getName());

        post.setProperty("author", entity.getKey().getName());
        post.setProperty("description", "Ma petite description");
        post.setProperty("imageName", "fakeimage.com");
        post.setProperty("imageUrl", imageUrl);
        post.setProperty("likeCounter", 0);
        post.setProperty("created_at", new Date());

        txn = datastore.beginTransaction();

        datastore.put(post);
        txn.commit();
    }
    public static void init(String author){
        String[] imageUrls = {
                "https://images.pexels.com/photos/5425710/pexels-photo-5425710.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
                "https://images.pexels.com/photos/5875946/pexels-photo-5875946.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
                "https://images.pexels.com/photos/1229650/pexels-photo-1229650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
                "https://images.pexels.com/photos/5020995/pexels-photo-5020995.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
                "https://images.pexels.com/photos/5376880/pexels-photo-5376880.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
                "https://images.pexels.com/photos/5679552/pexels-photo-5679552.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
                "https://images.pexels.com/photos/5563180/pexels-photo-5563180.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
                "https://images.pexels.com/photos/5529733/pexels-photo-5529733.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
                "https://images.pexels.com/photos/5840188/pexels-photo-5840188.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
                "https://images.pexels.com/photos/5646794/pexels-photo-5646794.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        };
        for(int i=0; i<10; i++) {
            Entity entity = new Entity(Post.class.getCanonicalName(),
                    Long.MAX_VALUE - (new Date()).getTime() + author);

            entity.setProperty("author", author);
            entity.setProperty("description", "Ma petite description");
            entity.setProperty("imageName", "fakeimage.com");
            entity.setProperty("imageUrl", imageUrls[i]);
            entity.setProperty("likeCounter", 0);
            entity.setProperty("created_at", new Date());

            DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
            Transaction txn = datastore.beginTransaction();

            datastore.put(entity);

            txn.commit();
        }
    }
}
