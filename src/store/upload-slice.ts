import { createSlice } from "@reduxjs/toolkit";

export type UploadState = {
  image: string;
  name: string;
  email: string;
};

export const initialUploadState: UploadState[] = [
  {
    image: "",
    name: "",
    email: "",
  },
];

const uploadSlice = createSlice({
  name: "uploadSlice",
  initialState: initialUploadState,
  reducers: {
    updateUploadSlice(state, action) {
      state = action.payload;
    },
  },
});

export default uploadSlice;
export const uploadActions = uploadSlice.actions;
