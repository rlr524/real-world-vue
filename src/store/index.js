/* eslint-disable */

import Vue from "vue";
import Vuex from "vuex";
import EventService from "@/services/EventService.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: { id: "def456", name: "Rob" },
    count: 0,
    categories: [
      "sustainability",
      "nature",
      "animal welfare",
      "housing",
      "education",
      "food",
      "community"
    ]
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event);
    }
  },
  actions: {
    createEvent({ commit }, event) {
      return EventService.postEvent(event).then(() => {
        commit("ADD_EVENT", event);
      });
    }
  },
  modules: {},
  getters: {
    getEventById: (state) => (id) => {
      return state.events.find((event) => event.id === id);
    }
    // another way to do this is simply use the same code as doneTodos but filter on !todo.done instead and get the length of that filtered value
  }
});
