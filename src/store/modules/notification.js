export const namespaced = true;

export const state = {
  notifications: []
};

let nextID = 1;

export const mutations = {
  PUSH(state, notification) {
    state.notifications.push({
      ...notification,
      id: nextID++
    });
  },
  DELETE(state, notificationToRemove) {
    state.notifications = state.notifications.filter(
      // eslint-disable-next-line
      (notification) => notification.id !== notificationToRemove.id
    );
  }
};

export const actions = {
  add({ commit }, notification) {
    commit("PUSH", notification);
  },
  remove({ commit }, notificationToRemove) {
    commit("DELETE", notificationToRemove);
  }
};