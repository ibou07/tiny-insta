/*
 * Copyright 2015 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.cloud.project;

import com.cloud.project.model.Post;
import com.cloud.project.model.Profile;
import com.cloud.project.utlil.Util;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.appengine.api.datastore.*;
import com.google.appengine.api.images.*;
import com.google.appengine.tools.cloudstorage.GcsFileOptions;
import com.google.appengine.tools.cloudstorage.GcsFilename;
import com.google.appengine.tools.cloudstorage.GcsService;
import com.google.appengine.tools.cloudstorage.GcsServiceFactory;
import com.google.appengine.tools.cloudstorage.RetryParams;
import endpoints.repackaged.com.google.gson.JsonObject;
import org.apache.commons.fileupload.FileItemIterator;
import org.apache.commons.fileupload.FileItemStream;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.io.IOUtils;

import java.io.*;
import java.nio.ByteBuffer;
import java.time.LocalDateTime;
import java.util.Date;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@SuppressWarnings("serial")
@WebServlet(name = "ImagesServlet", urlPatterns = { "/createpost" })
public class PostServlet extends HttpServlet {
    final String BUCKETPATH = "tinyinsta-image-storage";

    //google cloud service
    private final GcsService gcsService = GcsServiceFactory
            .createGcsService(new RetryParams.Builder()
            .initialRetryDelayMillis(10)
            .retryMaxAttempts(10)
            .totalRetryPeriodMillis(15000)
            .build());

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response){
        ServletFileUpload upload = new  ServletFileUpload();
        try {
            FileItemIterator iterator = upload.getItemIterator(request);

            //Get image file
            FileItemStream imageObjectStream = iterator.next();
            String imageExtension = imageExtension(imageObjectStream.getContentType());

            InputStream imageFileStream =imageObjectStream.openStream();
            byte[] imageBytes = IOUtils.toByteArray(imageFileStream);

            //Get description field
            InputStream descriptionStream = iterator.next().openStream();
            byte[] descriptionBytes = IOUtils.toByteArray(descriptionStream);
            String description = new String(descriptionBytes);

            //Get userId field
            InputStream userIdStream = iterator.next().openStream();
            byte[] userIdBytes = IOUtils.toByteArray(userIdStream);
            String userId = new String(userIdBytes);

            Entity author = Profile.findById(userId);
            if(author == null) {
                userNotFound(response);
            }else {
                // Write the image to Cloud Storage
                String filename = Util.normalize(LocalDateTime.now().toString()) + "." + imageExtension;
                saveImageToBucket(imageBytes, filename, imageObjectStream.getContentType());

                String url = getImageUrl(filename);

                String finalFilename = BUCKETPATH + "/" + filename;
                Entity post = savePost(finalFilename, description, url, author.getKey());
                successResponse(response, url, post);
            }

        } catch (FileUploadException | IOException e) {
            e.printStackTrace();
        }

    }

    /**
     * Write success message to the response stream
     * @param response
     * @param finalFilename
     * @param post
     * @throws IOException
     */
    private void successResponse(HttpServletResponse response, String finalFilename,
                                 Entity post) throws IOException {
        JsonObject jsonResponse = new JsonObject();
        jsonResponse.addProperty("status", "success");
        jsonResponse.addProperty("message", "Post validated");
        jsonResponse.addProperty("imageUrl", finalFilename);
        ObjectMapper objectMapper = new ObjectMapper();

        jsonResponse.addProperty("data", objectMapper.writeValueAsString(post));
        response.getWriter().write(jsonResponse.toString());
    }

    /**
     * Get image url
     * @param filename
     * @return
     */
    private String getImageUrl(String filename) {
        ServingUrlOptions options = ServingUrlOptions.Builder
                .withGoogleStorageFileName("/gs/" + BUCKETPATH + "/" + filename);
        ImagesService imagesService = ImagesServiceFactory.getImagesService();
      return imagesService.getServingUrl(options);
    }

    /**
     * Save image to the cloud datastorage bucket
     * @param imageBytes
     * @param filename
     * @param contentType
     * @throws IOException
     */
    private void saveImageToBucket(byte[] imageBytes, String filename, String contentType) throws IOException {
        gcsService.createOrReplace(
                new GcsFilename(BUCKETPATH, filename),
                new GcsFileOptions.Builder().mimeType(contentType).build(),
                ByteBuffer.wrap(imageBytes));
    }

    /**
     * Write user not found message to the response stream
     * @param response
     * @throws IOException
     */
    private void userNotFound(HttpServletResponse response) throws IOException {
        JsonObject jsonResponse = new JsonObject();
        jsonResponse.addProperty("status", "failed");
        jsonResponse.addProperty("message", "User not found");
        response.getWriter().println(jsonResponse.toString());
    }

    /**
     * Get image file extention
     * @param filetype image filename
     * @return
     */
    private String imageExtension(String filetype) {
        switch (filetype){
            case "image/jpeg": return "jpg";
            default: return filetype.split("/")[1];
        }
    }

    /**
     * Save post to the datastore
     * @param imageName image filename
     * @param description image description
     * @param authorKey author key
     * @return
     */
    private Entity savePost(String imageName, String description, String imageUrl, Key authorKey) {
        Entity entity = new Entity(Post.class.getCanonicalName(),
                Long.MAX_VALUE - (new Date()).getTime() + authorKey.getName());

        entity.setProperty("author", authorKey.getName());
        entity.setProperty("description", description);
        entity.setProperty("imageName", imageName);
        entity.setProperty("imageUrl", imageUrl);
        entity.setProperty("likeCounter", 0);
        entity.setProperty("created_at", new Date());

        DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
        Transaction txn = datastore.beginTransaction();

        datastore.put(entity);

        txn.commit();

        return entity;
    }
}
