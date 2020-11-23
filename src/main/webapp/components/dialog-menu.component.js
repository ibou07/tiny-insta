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
            let post = PostDataSet.posts.find(e => {return e.key.name == currentPostKey})
            let postIndex = PostDataSet.posts.indexOf(post);
            PostDataSet.posts.splice(postIndex, 1);
            $('#actionOnPost').modal('hide')
        })
        .catch(e=>{"Unable to delete post"})
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
                                   m("li", {class:"list-group-item"}, "Modifier"),
                                   m("li", {class:"list-group-item", onclick:deletePost}, "Supprimer")
                                ])
                            ])
                        ])
                   ])

       ])
   }
}