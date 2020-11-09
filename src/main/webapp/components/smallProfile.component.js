const SmallProfileComponent = {
    view: () => {
        console.log("Current user", currentUser)
        return m('div', {class: "col-sm-4 users"}, [
            m("img", {class:"image-profile", src:currentUser.imageUrl, alt:"Photo profile"}),
            m("div", {class: "details"}, [
                m("h5", {class:"pseudo"}, currentUser.name),
                m("p", {class: "name2"}, currentUser.name)
            ])
        ]);
    }
}