import { dataActions } from "../store/data-slice";
import { fileActions } from "../store/file-slice";
import { skillsActions } from "../store/tech-slice";

export default (dispatch: any) => {
  dispatch(fileActions.setEmptyFiles());
  dispatch(dataActions.setEmptyInfoData());
  dispatch(skillsActions.setEmptySkills());
};
