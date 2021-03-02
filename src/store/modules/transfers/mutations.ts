import { MutationTree } from "vuex";
import { MutationsNames } from "./enums";
import { State } from "./state";
import { Transfer } from "../../../classes/transfer";

export type Mutations<S = State> = {
  [MutationsNames.CHANGE_FILTER](state: State, paylaod: string): void;
  [MutationsNames.SET_TRANSFERS](state: State, payload: Array<Transfer>): void;
  [MutationsNames.SET_CATEGORY](state: State, payload: Array<string>): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationsNames.CHANGE_FILTER](state, payload: string) {
    state.activeFilter = payload;
  },
  [MutationsNames.SET_TRANSFERS](state, payload: Array<Transfer>) {
    state.transfers = payload;
  },
  [MutationsNames.SET_CATEGORY](state, payload: Array<string>) {
    state.category = Object.assign(payload);
  }
};
