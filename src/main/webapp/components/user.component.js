
function userComponent(data){
    return {
        data: data,
        view: () => {
            let user = convertKindToProfile(data);
            return m('li', {class:"explore__user"}, [
                       m("div", {class:"explore__user-column"}, [
                           m('img', {class:"explore__avatar", src: user.imageUrl}),
                           m('div', {class: "explore__info"}, [
                               m('span', {class:"explore__username"}, "@" + user.pseudo),
                               m('span', {class:"explore__fullname"}, user.givenName + " " + user.familyName)
                           ])
                       ]),
                       m('div', {class: "explore__user-column"}, [
                           m('button', "Suivre")
                       ])
                   ])
        }
    }

}
