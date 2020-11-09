//currenb user profile
var currentUser = {}

function loadCurrentUser(profile) {
    currentUser = {
        'id': profile.getId(),
        'pseudo': profile.getId(),
        'token': gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token,
        'name': profile.getName(),
        'givenName': profile.getGivenName(),
        'familyName': profile.getFamilyName(),
        'email': profile.getEmail(),
        'imageUrl': profile.getImageUrl(),
    }

    m.request({
          method: "GET",
          url: API_BASE_URL + "/retrieveProfile/:userId",
          params: {
            'userId': currentUser.id
          }
    })
    .then(function(result) {
        //create profile when not registred
        if(result == null){
            m.request({
                method: "POST",
                url: API_BASE_URL + "/createprofile?access_token=" + encodeURIComponent(currentUser.token),
                params: currentUser
            })
        }
    })
    .catch(function(e) {
        console.log(e.message)
     })
}

function onSignIn(googleUser){
       var profile = googleUser.getBasicProfile();
       loadCurrentUser(profile);
       m.route.set("/home");
}

const LoginComponent = {
    profile: {},
    gp_signOut: (e) => {
          var auth2 = gapi.auth2.getAuthInstance();
          auth2.signOut().then(function () {
          });
    },
    view: () => {
        return m('div', {class:"container", onclick:"onclick()"}, [
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
                    m("div", {class: "login row align-middle text-center"},[
                        m("div", {class:"col-12 g-signin2", "data-theme":"dark", href: "#", "data-onsuccess": "onSignIn"})
                    ])
                ])
            ])
        ])
    }
}