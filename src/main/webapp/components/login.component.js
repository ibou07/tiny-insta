const m = require("mithril");

export const LoginComponent = {

    view: () => {
        return m('div', {class:"container"}, [
            m('div', {class: 'row main'}, [
                m('div', {class:'left-box'}, [
                    m('div', {class:'carousel slide', id:'mainCarousel', 'data-ride':'carousel'},[
                        m('div', {class:'carousel-inner'}, [
                            m('div', {class:'carousel-item active'}, [
                                m('img', {class:'d-block', src:'./images/slide1.jpg', alt:'Profile 1'})
                            ]),
                            m('div', {class:'carousel-item'}, [
                                m('img', {class:'d-block', src:'./images/slide2.jpg', alt:'Profile 2'})
                            ]),
                            m('div', {class:'carousel-item'}, [
                                m('img', {class:'d-block', src:'./images/slide3.jpg', alt:'Profile 3'})
                            ]),
                            m('div', {class:'carousel-item'}, [
                                m('img', {class:'d-block', src:'./images/slide4.jpg', alt:'Profile 4'})
                            ]),
                            m('div', {class:'carousel-item'}, [
                                m('img', {class:'d-block', src:'./images/slide5.jpg', alt:'Profile 5'})
                            ]),
                        ])
                    ])
                ]),
                m('div', {class:'right-box'}, [
                    m('h1', {class:'instagram-icon'}),
                    m("div", {class: "login row align-middle"},[
                        m("div", {class:"col-12"},[
                            m('a', {class: "facebook", href: "#"}, [
                                m("i", {class: "fab fa-facebook-f"})
                            ], "Se connecter avec Facebook"),
                            m('a', {class: "twitter", href: "#"}, [
                                m("i", {class: "fab fa-twitter"})
                            ], "Se connecter avec Twitter"),
                            m('a', {class: "google", href: "#"}, [
                                m("i", {class: "fab fa-google-plus-g"})
                            ], "Se connecter avec Google")
                        ])
                    ])
                ])
            ])
        ])
    }
}