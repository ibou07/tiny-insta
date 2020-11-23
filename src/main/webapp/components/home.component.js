
const HomeComponent = {
    oninit: function(vnode) {
        if(currentUser == undefined || Object.keys(currentUser).length== 0)
            m.route.set("/login");
    },
    view: () => {
        return m('div', {class:"container"}, [
            m(HeaderComponent),
            m(TimelineComponent),
            m(DialogMenuComponent),
            m(MessageDialogComponent)
        ]);
    }
}