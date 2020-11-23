const HeaderComponent = {
    oncreate: (vnode) => {

        //add event to trigger input file
        let postIconImage = document.querySelector(".post-icon img");
        postIconImage.addEventListener('click', function () {
          let input = document.querySelector('.post-icon input[type="file"]');
          input.click();
        })

        //add selected image to the current dom
        let inputImageFile = vnode.dom.querySelector("#postimage");
        inputImageFile.addEventListener('change', function () {
            let output = document.getElementById("postoutput");
            let file = inputImageFile.files[0];
            let reader  = new FileReader();

            reader.addEventListener("load", function () {
                output.innerHTML = `<img src=${reader.result} class="d-block w-100" alt="Nouveau post">`;
                //make post component visible
                let postElement = document.getElementById('newPost');
                postElement.querySelector(".card-header h6").innerHTML = "Nouvelle publication";
                if(!isEditPost){
                    postElement.querySelector("#postDescription").value = "";
                    postElement.querySelector(".card-footer button").innerHTML = "Publier";
                }

                postElement.className = 'card col-12';
            }, false);

            if(file) {
                reader.readAsDataURL(file);
            }
        });
    },
    view: () => {
        return m('header', {}, [
            m("nav", {class:"navbar navbar-expand-sm navbar-light bg-light"}, [
                m("a", {class: "navbar-brand", href: "#"}, [
                    m("img", {src:"./images/instagram-icon-sm.png"})
                ]),
                m("button", {
                                class:"navbar-toggler",
                                type:"button",
                                "data-toggle":"collapse",
                                "data-target":"#mainNavbar",
                                "aria-controls":"mainNavbar",
                                "aria-expanded":"false",
                                "aria-label":"Toggle navigation"
                            }, [
                                m("span", {class: "navbar-toggler-icon"})
                ]),
                m("form", {class: "form-inline my-2"}, [
                    m("input", {
                                    class:"form-control mr-sm-2",
                                    type:"search",
                                    placeholder:"Rechercher",
                                    "aria-label":"Search"
                                })
                ]),
                m("div", {class:"collapse navbar-collapse m-auto", id:"mainNavbar"},[
                    m("ul", {class:"navbar-nav mr-auto"}, [
                        m("li", {class:"nav-item active"}, [
                            m("a", {class:"nav-link", href:"#"}, [
                                m("span", {class:"sr-only"}, "(Current)"),
                                m("img", {src:"./images/svg/home.svg"})
                            ])
                        ]),
                        m("li", {class:"nav-item"}, [
                            m("a", {class:"nav-link", href:"#"}, [
                                m("img", {src:"./images/svg/share.svg"})
                            ])
                        ]),
                        m("li", {class:"nav-item"}, [
                            m("a", {class:"nav-link", href:"#"}, [
                                m("img", {src:"./images/svg/compass.svg"})
                            ])
                        ]),
                        m("li", {class:"nav-item"}, [
                            m("a", {class:"nav-link", href:"#"}, [
                                m("img", {src:"./images/svg/no-like.svg"})
                            ])
                        ]),
                        m("li", {class:"nav-item post-icon", title: "Publier une photo"}, [
                            m(InitPostComponent)
                        ]),
                    ])
                ])
            ])
        ]);
    }
}