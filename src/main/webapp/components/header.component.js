const m = require("mithril");

export const HeaderComponent = {

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
                    ])
                ])
            ])
        ]);
    }
}