import { atom } from "recoil";

export const expandedStoriesListState = atom<String[]>({
    key: "storyState",
    default: [],
  });