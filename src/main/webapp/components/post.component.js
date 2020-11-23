var isEditPost = false;
 function post(){
    let files = document.getElementById('postimage').files;
    let file = "nochange";
    if(files.length != 0)
        file = document.getElementById('postimage').files[0];

    let description = document.getElementById('postDescription').value;

    let form = new FormData();
    form.append("imagefile", file);
    form.append("description", description)

    //post edit
    if(isEditPost){
        form.append('postKey', currentPostKey)
         //on post creation
            m.request({
                      method: "PUT",
                      url: "/createpost",
                      body: form
                  })
                  .then(e => {
                        if(e.status == "success") {
                            let post = PostDataSet.posts.find(e => {let a = e.key==undefined ? e.tag.data:e;return a.key.name == currentPostKey})
                            let postIndex = PostDataSet.posts.indexOf(post);
                            if(PostDataSet.posts[postIndex].properties != undefined){
                                PostDataSet.posts[postIndex].properties.description = description
                                let data = JSON.parse(e.data);
                                PostDataSet.posts[postIndex].properties.imageUrl = data.properties.imageUrl
                                PostDataSet.posts[postIndex].properties.imageName = data.properties.imageName
                            }
                            else{
                                PostDataSet.posts[postIndex].tag.data.properties.description = description
                                let data = JSON.parse(e.data);
                                PostDataSet.posts[postIndex].tag.data.properties.imageUrl = data.properties.imageUrl
                                PostDataSet.posts[postIndex].tag.data.properties.imageName = data.properties.imageName
                            }

                            let dom = document.getElementById('newPost');
                            dom.className = "card col-12 d-none"
                            isEditPost = false;
                            $('#messageDialog p').text("Post modifié avec succès !");
                            $('#messageDialog').modal('show');
                            m.redraw();

                        }
                  });
        return;
    }

    //on post creation
    form.append('userId', currentUser.googleId)
    m.request({
              method: "POST",
              url: "/createpost",
              body: form
          })
          .then(e => {
                if(e.status == "success") {
                    let data = JSON.parse(e.data)
                    let post = m(SimpleArticleComponent(data))
                    PostDataSet.posts.unshift(post);
                    let dom = document.getElementById('newPost');
                    dom.className = "card col-12 d-none"
                    document.getElementById("postDescription").value = "";
                }
          });
 }

 function onPostImageClick(event) {
    if(isEditPost) {
        let input = document.querySelector('.post-icon input[type="file"]');
        input.click();
    }
 }
 const PostComponent = {
   view: () => {
       return m('article', {class:"card col-12 d-none", id:"newPost"}, [
                m('div', {class: 'card-header'},[
                    m('h6', {}, 'Nouvelle publication')
                ]),
                m('div', {class: 'card-body'},[
                    m("div", {class:"carousel slide", id:"postoutput", onclick:onPostImageClick})
                ]),
                m('div', {class: 'card-footer'}, [
                    m('textarea', {class:"w-100", id:"postDescription", placeholder: "Une petite description !?"}),
                    m('button', {class:'btn btn-secondary mt-1 float-right', onclick: post}, 'Publier')
                ])
           ]);
   }
}