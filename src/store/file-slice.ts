import { createSlice } from "@reduxjs/toolkit";

export type FileState = {
  avatar: { name: string; src: string };
  file1: { name: string; src: string };
  file2: { name: string; src: string };
};

export const initialFileState: FileState = {
  file1: { name: "", src: "" },
  file2: { name: "", src: "" },
  avatar: { name: "", src: "" },
};

const fileSlice = createSlice({
  name: "fileSlice",
  initialState: initialFileState,
  reducers: {
    updateAvatar(state, action) {
      state.avatar.src = action.payload.avatar.src;
      state.avatar.name = action.payload.avatar.name;
    },
    updateFile1(state, action) {
      state.file1.src = action.payload.file1.src;
      state.file1.name = action.payload.file1.name;
    },
    updateFile2(state, action) {
      state.file2.src = action.payload.file2.src;
      state.file2.name = action.payload.file2.name;
    },
    setEmptyFiles(state) {
      state.file1 = { name: "", src: "" };
      state.file2 = { name: "", src: "" };
      state.avatar = { name: "", src: "" };
    },
  },
});

export default fileSlice;
export const fileActions = fileSlice.actions;
