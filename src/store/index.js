/* eslint-disable */

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: { id: "def456", name: "Rob" },
    categories: [
      "sustainability",
      "nature",
      "animal welfare",
      "housing",
      "education",
      "food",
      "community"
    ],
    todos: [
      { id: 1, text: "Do thing number 1", done: true },
      { id: 2, text: "Do thing number 2", done: false },
      { id: 3, text: "Do thing number 3", done: true },
      { id: 4, text: "Do thing number 4", done: false }
    ],
    events: [
      {
        id: 1,
        title: "Event number 1 title",
        organizer: "Event number 1 organizer"
      },
      {
        id: 2,
        title: "Event number 2 title",
        organizer: "Event number 2 organizer"
      },
      {
        id: 3,
        title: "Event number 3 title",
        organizer: "Event number 3 organizer"
      },
      {
        id: 4,
        title: "Event number 4 title",
        organizer: "Event number 4 organizer"
      }
    ]
  },
  mutations: {},
  actions: {},
  modules: {},
  getters: {
    catLength: (state) => {
      return state.categories.length;
    },
    doneTodos: (state) => {
      return state.todos.filter((todo) => todo.done);
    },
    activeTodos: (state, getters) => {
      return state.todos.length - getters.doneTodos.length;
    },
    getEventById: (state) => (id) => {
      return state.events.find((event) => event.id === id);
    }
    // another way to do this is simply use the same code as doneTodos but filter on !todo.done instead and get the length of that filtered value
  }
});
