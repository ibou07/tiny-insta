const m = require("mithril");
export const SmallProfileComponent = {
    view: () => {
        return m('div', {class: "col-sm-4 users"}, [
            m("img", {class:"image-profile", src:"https://via.placeholder.com/150", alt:"Photo profile"}),
            m("div", {class: "details"}, [
                m("h5", {class:"pseudo"}, "saliou673"),
                m("p", {class: "name2"}, "Mamadou Saliou DIALLO")
            ])
        ]);
    }
}