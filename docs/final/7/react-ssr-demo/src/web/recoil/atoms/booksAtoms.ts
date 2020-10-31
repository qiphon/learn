import { atom } from "recoil";

export const currentBookState = atom({
  key: "currentBook",
  default: [],
});
