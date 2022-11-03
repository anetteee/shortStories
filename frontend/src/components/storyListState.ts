import { atom } from "recoil";

//The atom represents the state
export const expandedStoriesListState = atom<String[]>({
    key: "storyState", //Unique identifier internally
    default: [], //Initial value of atom
  });