import { App } from "vue";

import WComponent from "./component";
import directive from "./directive";
export { WComponent, directive };

export default {
  install(app: App) {
    app.use(directive);
    app.use(WComponent);
  },
};
