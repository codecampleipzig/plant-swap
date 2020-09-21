import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import { auth } from "@/firebase";

Vue.config.productionTip = false;

auth.onAuthStateChanged(user => {
  if (user) {
    console.log("Logged in", user);
  } else {
    console.log("Logged out", user);
  }
  store.commit("SET_USER", user);
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
