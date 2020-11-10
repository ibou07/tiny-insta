
 function post(){
    console.log("post created !");
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