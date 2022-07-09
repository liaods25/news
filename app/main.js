import Vue from "vue";
import App from "./App";
import Page from "./components/page";

import ClUni from "cl-uni";

Vue.use(ClUni);
Vue.component('page', Page)
Vue.config.productionTip = false;

App.mpType = "app";

const app = new Vue({
	...App,
});
app.$mount();
