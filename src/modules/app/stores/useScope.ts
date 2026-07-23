import { AnalyzeScopeResponse } from "@/lib/ai/schemas";
import { create } from "zustand";

type useScopeType = {
  result: AnalyzeScopeResponse | null;
  setResult: (result: AnalyzeScopeResponse) => void;
};
export const useScope = create<useScopeType>((set) => ({
  result: null,
  setResult: (result) => set({ result }),
}));
