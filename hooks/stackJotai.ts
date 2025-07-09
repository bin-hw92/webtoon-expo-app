import AsyncStorage from "@react-native-async-storage/async-storage";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const StackListAtom = atom<string[]>([]);

export const stackAtom = atomWithStorage<string[]>("webview-history", [], {
  getItem: async (key) => {
    const json = await AsyncStorage.getItem(key);
    return json ? JSON.parse(json) : [];
  },
  setItem: async (key, value) => {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  },
  removeItem: async (key) => {
    await AsyncStorage.removeItem(key);
  },
});
