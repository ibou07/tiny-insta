function getUserIndexByKey(userKey){
    let user = ExploreDataSet.users.find(e => {return e.key.name == userKey})
    return ExploreDataSet.users.indexOf(user);
}
function follow(event) {
    event.preventDefault();
    let userKey = event.target.dataset.user;
    let button = document.querySelector("#u" + userKey + " button");
    console.log("related => ", button)
    //unfollow
    if(event.target.dataset.follow == "true") {
        m.request({
                  method: "GET",
                  url: API_BASE_URL + "/unfollow/:userKey?access_token=" + encodeURIComponent(currentUser.token),
                  params: {
                    'userKey': userKey
                  }
            })
            .then(response =>  {
                console.log("unfollow", response)
                let userIndex =getUserIndexByKey(userKey)
                let data = convertKindToProfile(response)
                currentUser.subscribers = data.subscribers;
                currentUser.subscriberCounter = data.subscriberCounter;
                button.innerText  = "Suivre"
                button.dataset.follow = false;
                m.redraw()
            })
    }else{
        //follow
        m.request({
                      method: "GET",
                      url: API_BASE_URL + "/follow/:userKey?access_token=" + encodeURIComponent(currentUser.token),
                      params: {
                        'userKey': userKey
                      }
                })
                .then(response =>  {
                    console.log("follow", response)
                    let userIndex =getUserIndexByKey(userKey)
                    let data = convertKindToProfile(response)
                    currentUser.subscribers = data.subscribers;
                    currentUser.subscriberCounter = data.subscriberCounter;
                    ExploreDataSet.users[userIndex].properties.key = userKey
                    button.innerText  = "Ne pas suivre"
                    button.dataset.follow = true;
                    m.redraw()
                })
    }

}
function userComponent(data){
    return {
        data: data,
        view: () => {
            let user = convertKindToProfile(data);
            let alreadyFollow = false;
            console.log("user to draw", user)
            console.log("user subscribers", user.subscribers)
            console.log("currentUser", currentUser.key)
            if(currentUser.subscribers != undefined){
                console.log("inside")
                alreadyFollow = currentUser.subscribers.includes(user.key);
            }
            console.log("Already", alreadyFollow)
            return m('li', {class:"explore__user", id:"u" + user.key}, [
                       m("div", {class:"explore__user-column"}, [
                           m('img', {class:"explore__avatar", src: user.imageUrl}),
                           m('div', {class: "explore__info"}, [
                               m('span', {class:"explore__username"}, "@" + user.pseudo),
                               m('span', {class:"explore__fullname"}, user.givenName + " " + user.familyName)
                           ])
                       ]),
                       m('div', {class: "explore__user-column"}, [
                           m('button', {"data-user":user.key, "data-follow":alreadyFollow?"true":"false", onclick: follow},(alreadyFollow?"Ne pas suivre": "Suivre"))
                       ])
                   ])
        }
    }

}
