import EventService from "@/services/EventService.js";

export const namespaced = true;

export const state = {
  events: [],
  eventsTotal: 0,
  event: {},
  perPage: 3
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
  fetchEvents({ commit, dispatch, state }, { page }) {
    return EventService.getEvents(state.perPage, page)
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
  fetchEvent({ commit, getters, state }, id) {
    if (id == state.event.id) {
      return state.event;
    }
    let event = getters.getEventById(id);
    if (event) {
      commit("SET_EVENT", event);
      return event;
    } else {
      // this is the promise, we need to return it so "then" will work in our router/index.js file in the beforeEnter method
      // we're creating the promise here *then* returning it in the router file; this is an asynchronous function call
      return EventService.getEvent(id).then((res) => {
        commit("SET_EVENT", res.data);
        return res.data;
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
