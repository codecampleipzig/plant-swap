import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import { vuexfireMutations, firestoreAction } from "vuexfire";
import { db } from "@/firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    user: null,
    plants: []
  },
  mutations: {
    ...vuexfireMutations,
    SET_USER(state, user) {
      state.user = user;
    }
  },
  actions: {
    bindPlants: firestoreAction(context => {
      return context.bindFirestoreRef("plants", db.collection("plants"));
    })
  },
  modules: {}
});
