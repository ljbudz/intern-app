import {
  CREATE_APPLICATION,
  EDIT_APPLICATION,
  DELETE_APPLICATION,
  FETCH_APPLICATION,
  FETCH_APPLICATIONS,
  SIGN_IN,
  SIGN_OUT
} from "./types";
import history from "../history";
import application from "../apis/applications";

export const signIn = userId => {
  return {
    type: SIGN_IN,
    payload: userId
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT
  };
};
