import { ActionTree, ActionContext } from "vuex";
import { Transfer } from "../../../classes/transfer";
import { ActionsNames, MutationsNames } from "./enums";
import { State } from "./state";

export interface Actions {
  [ActionsNames.GET_TRANSFERS]({
    commit,
    dispatch
  }: ActionContext<State, State>): void;
  [ActionsNames.ADD_TRANSFER](
    { commit }: ActionContext<State, State>,
    paylod: Transfer
  ): void;
  [ActionsNames.SET_CATEGORY]({
    state,
    commit
  }: ActionContext<State, State>): void;
  [ActionsNames.DELETE_TRANSFER](
    { dispatch }: ActionContext<State, State>,
    payload: number
  ): void;
}

export const actions: ActionTree<State, State> & Actions = {
  async [ActionsNames.GET_TRANSFERS]({ commit, dispatch }) {
    const data = localStorage.getItem("transfers");
    if (data) {
      const payload = JSON.parse(data);
      await commit(MutationsNames.SET_TRANSFERS, payload);
      await dispatch(ActionsNames.SET_CATEGORY);
    }
  },
  [ActionsNames.ADD_TRANSFER]({ dispatch }, payload: Transfer) {
    const dataString: string | null = localStorage.getItem("transfers");
    let data;
    if (dataString) {
      localStorage.removeItem("transfers");
      data = JSON.parse(dataString);
    } else {
      data = [];
    }
    data.push(payload);
    const newDataString: string = JSON.stringify(data);
    localStorage.setItem("transfers", newDataString);
    dispatch(ActionsNames.GET_TRANSFERS);
  },
  [ActionsNames.SET_CATEGORY]({ state, commit }) {
    const category: Array<string> = state.transfers.reduce(
      (acc: Array<string>, transfer: Transfer) => {
        transfer.category.forEach((category: string) => {
          if (!acc.some((item: string) => item === category)) {
            acc.push(category);
          }
        });
        return acc;
      },
      []
    );
    commit(MutationsNames.SET_CATEGORY, category);
  },
  [ActionsNames.DELETE_TRANSFER]({ dispatch }, payload: number) {
    const transfers = localStorage.getItem("transfers");
    if (transfers) {
      const parsedData: Array<Transfer> = JSON.parse(transfers);
      const element: Transfer = parsedData.find(
        (transfer: Transfer) => transfer.id === payload
      );
      const index = parsedData.indexOf(element);
      parsedData.splice(index, 1);
      const stringData = JSON.stringify(parsedData);
      localStorage.removeItem("transfers");
      localStorage.setItem("transfers", stringData);
    }
    dispatch(ActionsNames.GET_TRANSFERS);
  }
};
