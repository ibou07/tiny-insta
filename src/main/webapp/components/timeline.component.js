var PostDataSet = {
    posts: [],
    nextToken: "",
    loadPosts: function() {
        return m.request(
            {
                method: "GET",
                url: API_BASE_URL + "/posts/" + currentUser.googleId
             })
            .then(function(response) {
                if(response.items != null && response.items != undefined){
                    PostDataSet.posts = response.items
                    if ('nextPageToken' in response) {
                        PostDataSet.nextToken= response.nextPageToken
                    } else {
                        PostDataSet.nextToken = ""
                    }
                }
            }).catch(e => {console.log("post not found")})
    },
    next: () => {
        if(PostDataSet.nextToken != ""){
            return m.request({
                method: "GET",
                url: API_BASE_URL + "/posts/" + currentUser.googleId + "?next="+ PostDataSet.nextToken + "&userKey=" + currentUser.key })
            .then(function(response) {

                setTimeout(e=>{
                    response.items.map(function(item){PostDataSet.posts.push(item)})
                    document.body.scrollTop = currentScrollPosition;
                    isDataLoading = false;
                }, 200)

                if ('nextPageToken' in response) {
                    PostDataSet.nextToken = response.nextPageToken
                } else {
                    PostDataSet.nextToken = ""
                }})
            .catch(e => {console.log("next post not found")})
        }
    }
}

const TimelineComponent = {
    oninit: PostDataSet.loadPosts,
    view: () => {
        return m('div', {class:"feed row"}, [
            m("div", {class:"col-sm-8 feed-content row"}, [
                m(PostComponent),
                PostDataSet.posts.map(post => {
                    return m(SimpleArticleComponent(post))
                })
            ]),
            m(SmallProfileComponent)
        ]);
    }
}