import { configureStore } from "@reduxjs/toolkit";

import dataSlice from "./data-slice";
import fileSlice from "./file-slice";
import techSlice from "./tech-slice";
import uploadSlice from "./upload-slice";

const store = configureStore({
  reducer: {
    data: dataSlice.reducer,
    file: fileSlice.reducer,
    tech: techSlice.reducer,
    upload: uploadSlice.reducer,
  },
});

export default store;
