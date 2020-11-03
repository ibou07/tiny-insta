const m = require("mithril");
import  {SimpleArticleComponent} from "./simpleArticle.component"
import { ArticleWithSlideComponent } from "./articleWithSlide.component";
import { SmallProfileComponent } from "./smallProfile.component";
export const TimelineComponent = {

    view: () => {
        return m('div', {class:"feed row"}, [
            m("div", {class:"col-sm-8 feed-content row"}, [
                m(SimpleArticleComponent),
                m(ArticleWithSlideComponent),
                m(SimpleArticleComponent)
            ]),
            m(SmallProfileComponent)
        ]);
    }
}