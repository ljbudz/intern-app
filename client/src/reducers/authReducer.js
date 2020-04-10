import { SET_CURRENT_USER, LOADING_USER } from "../actions/types";
import _ from "lodash";

const INITIAL_STATE = {
  isAuthenticated: false,
  user: {},
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !_.isEmpty(action.payload),
        user: action.payload,
        loading: false
      };
    case LOADING_USER:
      return { ...state, loading: true };
    default:
      return state;
  }
};
