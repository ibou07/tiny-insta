function deletePost(event) {
     m.request({
              method: "GET",
              url: API_BASE_URL + "/postdelete/:key",
              params: {
                'key': currentPostKey
              }
        })
        .then(response =>  {
            console.log(response)
            let post = PostDataSet.posts.find(e => {let a = e.key==undefined ? e.tag.data:e; return a.key.name == currentPostKey})
            let postIndex = PostDataSet.posts.indexOf(post);
            PostDataSet.posts.splice(postIndex, 1);
            $('#messageDialog p').text("Post supprimé avec succès !");
            $('#messageDialog').modal('show');
            $('#actionOnPost').modal('hide')
        })
        .catch(e=>{"Unable to delete post"})
}

function updatePost(event) {
     let post = PostDataSet.posts.find(e => {let a = e.key==undefined ? e.tag.data:e; return a.key.name == currentPostKey})
     post = convertKindToPost(post);
     let postIndex = PostDataSet.posts.indexOf(post);
     let postElement = document.getElementById('newPost');
     postElement.querySelector(".card-header h6").innerHTML = "Modification de la publication";
     postElement.querySelector(".card-footer button").innerHTML = "Modifier";
     postElement.querySelector("#postoutput").innerHTML = `<img src=${post.imageUrl} class="d-block w-100" alt="Nouveau post">`;
     let description = postElement.querySelector("#postDescription");
     description.value = post.description;
     description.focus()
     postElement.className = 'card col-12';
     document.body.scrollTop = 50; //px
     isEditPost = true;
     $('#actionOnPost').modal('hide')
}
const DialogMenuComponent = {
   view: () => {
       return m("div", {class:"modal", tabindex:"-1", id:"actionOnPost"},[
                   m('div', {class:"modal-dialog", role:"document"}, [
                        m("div", {class:"modal-content"}, [
                            m("div", {class:"modal-header"},[
                                 m("button", {type:"button", class:"close", "data-dismiss":"modal", "aria-label":"Close"},[
                                    m.trust('<span aria-hidden="true">&times;</span>')
                                 ])
                            ]),
                            m('div',{class:"modal-body"}, [
                                m("ul", {class:"list-group"},[
                                   m("li", {class:"list-group-item", onclick:updatePost}, "Modifier"),
                                   m("li", {class:"list-group-item", onclick:deletePost}, "Supprimer")
                                ])
                            ])
                        ])
                   ])

       ])
   }
}