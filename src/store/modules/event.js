/* eslint-disable */

import EventService from "@/services/EventService.js";

export const namespaced = true;

export const state = {
  events: [],
  eventsTotal: 0,
  event: {}
};

// best practice that mutations are only to be called from actions inside the same module, not called from other modules
export const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event);
  },
  SET_EVENTS(state, events) {
    state.events = events;
  },
  SET_EVENTS_TOTAL(state, eventsTotal) {
    state.eventsTotal = eventsTotal;
  },
  SET_EVENT(state, event) {
    state.event = event;
  }
};

export const actions = {
  createEvent({ commit, rootState, dispatch }, event) {
    return EventService.postEvent(event)
      .then(() => {
        console.log("User creating event is: " + rootState.user.user.name);
        commit("ADD_EVENT", event);
        const notification = {
          type: "success",
          message: "Your event has been created!"
        };
        dispatch("notification/add", notification, { root: true });
      })
      .catch((error) => {
        const notification = {
          type: "error",
          message: "There was a problem creating your event: " + error.message
        };
        dispatch("notification/add", notification, { root: true });
        throw error;
      });
  },
  fetchEvents({ commit, dispatch }, { perPage, page }) {
    EventService.getEvents(perPage, page)
      .then((res) => {
        commit("SET_EVENTS_TOTAL", parseInt(res.headers["x-total-count"]));
        commit("SET_EVENTS", res.data);
      })
      .catch((error) => {
        const notification = {
          type: "error",
          message: "There was a problem fetching events: " + error.message
        };
        dispatch("notification/add", notification, { root: true });
      });
  },
  fetchEvent({ commit, getters, dispatch }, id) {
    let event = getters.getEventById(id);
    if (event) {
      commit("SET_EVENT", event);
    } else {
      EventService.getEvent(id)
        // eslint-disable-next-line
        .then((res) => {
          commit("SET_EVENT", res.data);
        })
        // eslint-disable-next-line
        .catch((error) => {
          const notification = {
            type: "error",
            message: "There was a problem fetching the event: " + error.message
          };
          dispatch("notification/add", notification, { root: true });
        });
    }
  }
};

export const getters = {
  getEventById: (state) => (id) => {
    return state.events.find((event) => event.id === id);
  }
  // another way to do this is simply use the same code as doneTodos but filter on !todo.done instead and get the length of that filtered value
};
