const TimelineComponent = {

    view: () => {
        return m('div', {class:"feed row"}, [
            m("div", {class:"col-sm-8 feed-content row"}, [
                m(PostComponent),
                m(SimpleArticleComponent),
                m(ArticleWithSlideComponent),
                m(SimpleArticleComponent)
            ]),
            m(SmallProfileComponent)
        ]);
    }
}