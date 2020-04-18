import { SET_THEME } from "../actions/types";

const DEFAULT_STATE = {
  mode: "light"
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_THEME:
      return { ...state, mode: action.payload };
    default:
      return { ...state };
  }
};
