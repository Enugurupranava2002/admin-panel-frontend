import { createSlice } from "@reduxjs/toolkit";

export type DataState = {
  username: string;
  about: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  address1: string;
  address2: string;
  state: string;
  pin: string;
};

export const initialDataState = {
  username: "",
  about: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  country: "None",
  city: "",
  address1: "",
  address2: "",
  state: "",
  pin: "",
};

const KEYS = [
  "username",
  "about",
  "firstName",
  "lastName",
  "email",
  "phone",
  "country",
  "city",
  "address1",
  "address2",
  "state",
  "pin",
];

const dataSlice = createSlice({
  name: "dataSlice",
  initialState: initialDataState,
  reducers: {
    updateInfoData(state, action) {
      KEYS.forEach((key: string) => {
        state[key as keyof DataState] = action.payload[key] as string;
      });
    },
    setEmptyInfoData(state) {
      KEYS.forEach((key: string) => {
        if (key === "country") {
          state[key as keyof DataState] = "None";
          return;
        }
        state[key as keyof DataState] = "";
      });
    },
  },
});

export default dataSlice;
export const dataActions = dataSlice.actions;
