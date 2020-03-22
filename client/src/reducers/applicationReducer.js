import _ from "lodash";
import {
  CREATE_APPLICATION,
  EDIT_APPLICATION,
  DELETE_APPLICATION,
  FETCH_APPLICATION,
  FETCH_APPLICATIONS
} from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case CREATE_APPLICATION:
      return { ...state, [action.payload._id]: action.payload };
    case FETCH_APPLICATION:
      return { ...state, [action.payload._id]: action.payload };
    case FETCH_APPLICATIONS:
      return { ...state, ..._.mapKeys(action.payload, "_id") };
    case EDIT_APPLICATION:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_APPLICATION:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
