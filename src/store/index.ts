import Vue from "vue";
import Vuex from "vuex";
import { transfers } from "./modules/transfers";
/**
 * Import store module.
 */

Vue.use(Vuex);
export const store = new Vuex.Store({
  modules: {
    transfers
  }
});
