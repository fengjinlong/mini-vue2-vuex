import Vue from "vue";
import Vuex from "./mini-vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    name: "fjl",
    age: 20,
  },
  actions: {
    asyncSub(store, p) {
      setTimeout(() => {
        store.commit("asyncSub", p);
      });
    },
  },
  mutations: {
    addAge(state, p) {
      state.age = state.age + p;
    },
    asyncSub(state, payload) {
      state.age -= payload;
    },
  },
  getters: {
    myName(state) {
      return state.name;
    },
    myAge(state) {
      return state.age;
    },
  },
});
