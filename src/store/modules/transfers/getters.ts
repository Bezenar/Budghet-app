import { GetterTree } from "vuex";
import { State } from "./state";
import { Transfer } from "../../../classes/transfer";

export type Getters = {
  getAllTransfers(state: State): Array<Transfer>;
  getActiveFilter(state: State): string;
  totalBalance(state: State): number;
  getFilteredTransfers(state: State): void;
  allCategorys(state: State): Array<string>;
};

export const getters: GetterTree<State, State> & Getters = {
  getAllTransfers: state => state.transfers,
  getActiveFilter: state => state.activeFilter,
  allCategorys: state =>
    state.transfers.reduce((acc: Array<string>, transfer: Transfer) => {
      transfer.category.forEach((existCat: string) => {
        if (
          !acc.some(
            (accCat: string) => accCat.toLowerCase() === existCat.toLowerCase()
          )
        ) {
          acc.push(existCat);
        }
      });
      return acc;
    }, []),
  getFilteredTransfers: state => {
    const storeState = state;
    return function(type: string, category: Array<string> = []) {
      let list;
      switch (type) {
        case "INCOME":
          list = storeState.transfers.filter(
            (transfer: Transfer) => transfer.type === "INCOME"
          );
          break;
        case "COSTS":
          list = storeState.transfers.filter(
            (transfer: Transfer) => transfer.type === "COSTS"
          );
          break;
        default:
          list = storeState.transfers;
          break;
      }
      if (category[0] !== "") {
        const filteredListByCategory = list.reduce(
          (acc: Array<Transfer>, transfer: Transfer) => {
            category.forEach((funcCat: string) => {
              if (
                transfer.category.some(
                  (transCat: string) => funcCat === transCat
                ) &&
                !acc.some((accTrans: Transfer) => accTrans.id === transfer.id)
              ) {
                acc.push(transfer);
              }
            });
            return acc;
          },
          []
        );
        return filteredListByCategory;
      }
      return list;
    };
  },
  totalBalance: state =>
    state.transfers.reduce((acc: number, trans: Transfer) => {
      acc += Number(trans.value);
      return acc;
    }, 0)
};
