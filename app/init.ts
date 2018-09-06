import MainView from "./components/Layout/Layout.vue";
import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
});

class AppCore {
  private instance!: Vue;

  constructor() {
    this.init();
  }

  private init() {
    this.instance = new Vue({
      el: "#app",
      router,
      render: (h) => h(MainView),
    });
  }
}

// tslint:disable-next-line:no-unused-expression
new AppCore();
