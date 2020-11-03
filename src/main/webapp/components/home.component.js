const m = require("mithril");
import { HeaderComponent } from "./header.component";
import { TimelineComponent } from "./timeline.component";
export const HomeComponent = {

    view: () => {
        return m('div', {class:"container"}, [
            m(HeaderComponent, {}, "Hello"),
            m(TimelineComponent)
        ]);
    }
}