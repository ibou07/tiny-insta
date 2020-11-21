const TimelineComponent = {
    posts: [],
    nextToken: "",
    loadPosts: () => {
        return
            m.request(
            {
                method: "GET",
                url: API_BASE_URL + "/posts/" + currentUser.key
             })
            .then(function(response) {
                console.log("got:",response)
                TimelineComponent.posts = response.items
                if ('nextPageToken' in response) {
                    MyPost.nextToken= response.nextPageToken
                } else {
                    TimelineComponent.nextToken = ""
                }
            })
    },
    next: () => {
        return m.request({
            method: "GET",
            url: API_BASE_URL + "/posts" + currentUser.key + "?next="+ TimelineComponent.nextToken})
        .then(function(result) {
            console.log("got:",response)
            response.items.map(function(item){MyPost.list.push(item)})
            if ('nextPageToken' in result) {
                TimelineComponent.nextToken= response.nextPageToken
            } else {
                TimelineComponent.nextToken=""
            }})
    },
    oninit: () => {
        TimelineComponent.loadPosts();
    },
    view: () => {
        return m('div', {class:"feed row"}, [
            m("div", {class:"col-sm-8 feed-content row"}, [
                m(PostComponent),
                TimelineComponent.posts.map(post => {
                    return m(SimpleArticleComponent(post))
                }),
                m('button',{
                		      class: 'btn btn-primary',
                		      onclick: function(e) {TimelineComponent.next()}
                		      },
                		  "Next")
            ]),
            m(SmallProfileComponent)
        ]);
    }
}