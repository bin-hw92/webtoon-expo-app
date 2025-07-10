// atoms.ts
import { atomWithStorage } from "jotai/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const historyAtom = atomWithStorage<string[]>("webview-history", [], {
  getItem: async (key) => {
    const item = await AsyncStorage.getItem(key);
    return item ? JSON.parse(item) : [];
  },
  setItem: async (key, value) => {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  },
  removeItem: async (key) => {
    await AsyncStorage.removeItem(key);
  },
});
