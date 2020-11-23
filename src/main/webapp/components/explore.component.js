var isFirstUserInput = true
var ExploreDataSet = {
 users: [],
 nextToken: "",
 loadUsers: function() {
    if(currentUser == undefined || Object.keys(currentUser).length== 0){
        m.route.set("/login");
        return;
    }
     return m.request(
         {
             method: "GET",
             url: API_BASE_URL + "/users?access_token=" + encodeURIComponent(currentUser.token)
          })
         .then(function(response) {
            if(response.items != null && response.items != undefined){
                 ExploreDataSet.users = response.items
                 if ('nextPageToken' in response) {
                     ExploreDataSet.nextToken= response.nextPageToken
                 } else {
                     ExploreDataSet.nextToken = ""
                 }
            }
         }).catch(e => {console.log("person not found")})
 },
 next: () => {
     if(ExploreDataSet.nextToken != ""){
        let keyword = document.getElementById('search').value;
        if(keyword.length > 0)
             return m.request({
                 method: "GET",
                 url: API_BASE_URL + "/users/" + keyword + "?access_token=" + encodeURIComponent(currentUser.token) + "&next="+ ExploreDataSet.nextToken})
             .then(function(response) {

                 setTimeout(e=>{
                     response.items.map(function(item){ExploreDataSet.users.push(item)})
                     document.body.scrollTop = currentScrollPosition;
                     isDataLoading = false;
                 }, 200)

                 if ('nextPageToken' in response) {
                     ExploreDataSet.nextToken = response.nextPageToken
                 } else {
                     ExploreDataSet.nextToken = ""
                 }})
             .catch(e => {console.log("next user not found")})
     }
 }
}
const ExploreComponent = {
    oninit: ExploreDataSet.loadUsers,
    oncreate: (vnode) => {
        let search = document.getElementById('search')
        search.addEventListener('keypress', (event)=>{
            ExploreDataSet.loadUsers();
            m.redraw()
        })
        search.focus();
    },
    view: () => {
        return m('div', {class:"container"}, [
            m(HeaderComponent),
            m("div", {id: "explore"}, [
                m('ul', {class:"explore__users"}, [
                    ExploreDataSet.users.map(user => {
                        return m(userComponent(user))
                    })
                ])
            ]),
            m(DialogMenuComponent),
            m(MessageDialogComponent)
        ]);
    }
}