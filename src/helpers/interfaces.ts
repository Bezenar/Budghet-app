import { Input, Filter } from "./types";
export interface AppData {
  tooltip: boolean;
}

export interface FiltersData {
  filters: Array<Filter>;
  categoryFilter: string;
  showCategory: boolean;
}

export interface FormData {
  type: Input<string>;
  amount: Input<number | string>;
  description: string;
  category: string;
}

export interface Categorys {
  [propName: string]: Array<string>;
}

export interface IconData {
  url: string;
  alt: string;
  title: string;
}

export interface DescriptionData {
  extendedDescription: boolean;
  height: number;
}
