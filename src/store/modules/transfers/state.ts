import { Transfer } from "../../../classes/transfer";
import { Categorys } from "@/helpers/interfaces";
export const state = {
  transfers: [] as Array<Transfer>,
  category: {} as Categorys,
  activeFilter: "All" as string
};

export type State = typeof state;
