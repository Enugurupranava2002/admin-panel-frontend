import { createSlice } from "@reduxjs/toolkit";

export type SkillsState = {
  skills: string[];
  geolocation: string;
};

export const initialSkillsState: SkillsState = {
  skills: [],
  geolocation: "",
};

const skillsSlice = createSlice({
  name: "skillState",
  initialState: initialSkillsState,
  reducers: {
    updateSkills(state, action) {
      state.skills = action.payload.skills;
      console.log(state.skills);
    },
    setEmptySkills(state) {
      state.skills = [];
    },
    updateGeolocation(state, action) {
      state.geolocation = action.payload.geolocation;
      console.log(state.geolocation);
    },
  },
});

export default skillsSlice;
export const skillsActions = skillsSlice.actions;
