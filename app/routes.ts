import MainView from "./components/main/main.vue";
import NotFoundView from "./components/notFound.vue";
import TestView from "./components/test/test.vue";

// Import Views - Dash

// Routes
const routes = [
  {
    path: "/",
    component: TestView,
  }, {
    path: "*",
    component: NotFoundView,
  },
];

export default routes;
