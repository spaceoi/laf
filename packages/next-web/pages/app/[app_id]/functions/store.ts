import create from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import request from "@/utils/request";

type TFunction =
  | {
      _id: string;
      name: string;
      code: string;
      label: string;
      hash: string;
      tags: string[];
      description: string;
      enableHTTP: boolean;
      status: number;
      triggers: any[];
      debugParams: string;
      version: number;
      created_at: Date;
      updated_at: Date;
      created_by: string;
      appid: string;
    }
  | undefined;

type State = {
  currentFunction: TFunction;
  favFunctoinList: any[];
  allFunctionList?: any[];
  initFunctionPage: () => void;

  setCurrentFunction: (currentFunction: TFunction) => void;
};

const useFunctionStore = create<State>()(
  devtools(
    immer((set) => ({
      currentFunction: undefined,
      favFunctoinList: [],

      allFunctionList: [],

      initFunctionPage: async () => {
        const res = await request.get("/api/function_list");
        set((state) => {
          state.allFunctionList = res.data;
          state.currentFunction = res.data[0];
        });
      },

      setCurrentFunction: (currentFunction) =>
        set((state) => {
          state.currentFunction = JSON.parse(JSON.stringify(currentFunction));
          return state;
        }),
    })),
  ),
);

export default useFunctionStore;
