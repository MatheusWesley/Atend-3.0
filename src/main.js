import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueTheMask from 'vue-the-mask';
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import VueMarkdown from 'vue-markdown';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(BootstrapVue);
Vue.use(VueTheMask);
Vue.use(IconsPlugin);
Vue.use(VueMarkdown);

Vue.config.productionTip = false;

new Vue({
  components: {
    VueMarkdown,
  },
  router,
  render: (h) => h(App)
}).$mount("#app");

