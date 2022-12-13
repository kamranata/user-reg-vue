import Vue from "vue";
import App from "./App.vue";
// import mask from "./plugins/mask";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

new Vue({
  // mask,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
