import Vue from "vue";
import VueRouter from "vue-router";
import EventList from "../views/EventList";
import EventShow from "../views/EventShow";
import EventCreate from "../views/EventCreate";
import Nprogress from "nprogress";
import store from "@/store/index.js";
import NotFound from "@/components/NotFound";
import NetworkIssue from "@/components/NetworkIssue";
import Example from "@/components/Example";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "event-list",
    component: EventList,
    props: true
    // TODO: Move the fetchEvents method into here
  },
  {
    path: "/event/:id",
    name: "event-show",
    component: EventShow,
    props: true,
    beforeEnter: (to, from, next) => {
      store
        .dispatch("event/fetchEvent", to.params.id)
        .then((event) => {
          to.params.event = event;
          next();
        })
        .catch((error) => {
          if (error.response && error.response.status == 404) {
            next({ name: "404", params: { resource: "event" } });
          } else {
            next({ name: "network-issue" });
          }
        });
    }
  },
  {
    path: "/event/create/",
    name: "event-create",
    component: EventCreate
  },
  {
    path: "/404",
    name: "404",
    component: NotFound,
    props: true
  },
  {
    path: "/network-issue",
    name: "network-issue",
    component: NetworkIssue
  },
  {
    path: "*",
    redirect: { name: "404", params: { resource: "page" } }
  },
  {
    path: "/example",
    name: "example",
    component: Example
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

router.beforeEach((routeTo, routeFrom, next) => {
  Nprogress.start();
  next();
});

router.afterEach(() => {
  Nprogress.done();
});

export default router;
