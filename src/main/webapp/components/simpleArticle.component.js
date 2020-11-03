const m = require("mithril");

export const SimpleArticleComponent = {
    view: () => {
        return m("article", {class:"card col-12"}, [
            m("div", {class:"card-header"}, [
                m("img", {class:"image-profile", src:"https://via.placeholder.com/150", alt:"Photo profile"}),
                m("div", {class: "details"}, [
                    m("h5", {class: "name"}, "Mamadou Saliou DIALLO"),
                    m("p", {class: "location"}, "Nantes")
                ]),
                m("a", {class:"dot", href:"#"}, [
                    m("img", {src:"./images/svg/dot.svg", alt:"Plus"})
                ])
            ]),
            m("div", {class:"card-body"}, [
                m("div", {class:"carousel slide", id:"newsCarousel"}, [
                    m("img", { class:"d-block w-100", src:"https://via.placeholder.com/400&text=Photo 1", alt:"Photo 1"})
                ]),
                m("ul", {class: "actions"}, [
                    m("li", {}, [
                        m("a", {href: "#"}, [
                            m("img", {src:"./images/svg/no-like.svg", alt:"Like button"})
                        ])
                    ]),
                    m("li", {}, [
                        m("a", {href: "#"}, [
                            m("img", {src:"./images/svg/comment.svg", alt:"Comment button"})
                        ])
                    ]),
                    m("li", {}, [
                        m("a", {href: "#"}, [
                            m("img", {src:"./images/svg/share.svg", alt:"Share button"})
                        ])
                    ]),
                    m("li", {}, [
                        m("a", {href: "#"}, [
                            m("img", {src:"./images/svg/bookmark.svg", alt:"Save button"})
                        ])
                    ]),

                ]),
                m("div", {class: "like"}, [
                    m("b", {}, "8"),
                    "  J'aime"
                ]),
                m("div", {class:"date"}, "27 Août")
            ]),
            m("div", {class:"card-footer"}, [
                m("form", {class:"inline-form", action:""}, [
                    m("input", {type:"text", placeholder:"Ajouter un commentaire"}),
                    m("button", {class:"submit-comment", type:"submit"}, "Publier")
                ]),
                m("div", {class:"comments"}, [
                    m("div", {class:"comment row"}, [
                        m("div", {class:"col-1 comment-author"}, [
                            m("img", {src:"https://via.placeholder.com/150", alt:"Photo profile"})
                        ]),
                        m("div", {class:"col comment-content"}, [
                            m("span", {}, "Mamadou Saliou DIALLO"),
                            m("p", {}, "Lorem ipsum dolor sit, amet consectetur adipisicing elit.\
                                        Officia voluptatem vero non fuga minima quo neque suscipit! Sed molestias")
                        ])
                    ]),
                    m("div", {class:"comment row"}, [
                        m("div", {class:"col-1 comment-author"}, [
                            m("img", {src:"https://via.placeholder.com/150", alt:"Photo profile"})
                        ]),
                        m("div", {class:"col comment-content"}, [
                            m("span", {}, "Mamadou Saliou DIALLO"),
                            m("p", {}, "Lorem ipsum dolor sit, amet consectetur adipisicing elit.\
                                        Officia voluptatem vero non fuga minima quo neque suscipit! Sed molestias")
                        ])
                    ])
                ])
            ])
        ]);
    }
}