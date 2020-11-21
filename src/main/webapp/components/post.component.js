
 function post(){
    let file = document.getElementById('postimage').files[0];
    let description = document.getElementById('postDescription').value;

    let form = new FormData();
    form.append("imagefile", file);
    form.append("description", description)
    form.append('userId', currentUser.googleId)
    m.request({
              method: "POST",
              url: "/createpost",
              body: form
          })
          .then(e => {
                if(e.status == "success") {
                    let data = JSON.parse(e.data)
                    let post = SimpleArticleComponent(data)
                    TimelineComponent.posts.push(post);
                    document.getElementById('newPost').remove();
                }
          });
 }
 const PostComponent = {
   view: () => {
       return m('article', {class:"card col-12 d-none", id:"newPost"}, [
                m('div', {class: 'card-header'},[
                    m('h6', {}, 'Nouvelle publication')
                ]),
                m('div', {class: 'card-body'},[
                    m("div", {class:"carousel slide", id:"postoutput"})
                ]),
                m('div', {class: 'card-footer'}, [
                    m('textarea', {class:"w-100", id:"postDescription", placeholder: "Une petite description !?"}),
                    m('button', {class:'btn btn-secondary mt-1 float-right', onclick: post}, 'Publier')
                ])
           ]);
   }
}