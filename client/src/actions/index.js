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

export const createApplication = formValues => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const response = await application.post("/applications", { ...formValues, userId });
  dispatch({
    type: CREATE_APPLICATION,
    payload: response.data
  });
  history.push("/");
};

export const fetchApplications = () => async dispatch => {
  const response = await application.get("/applications");
  dispatch({ type: FETCH_APPLICATIONS, payload: response.data });
};

export const fetchApplication = id => async dispatch => {
  const response = await application.get(`/applications/${id}`);
  dispatch({ type: FETCH_APPLICATION, payload: response.data });
};

export const editApplication = (id, formValues) => async dispatch => {
  const response = await application.patch(`/applications/${id}`, formValues);
  dispatch({ type: EDIT_APPLICATION, payload: response.data });
  history.push("/");
};

export const deleteApplication = id => async dispatch => {
  await application.delete(`/applications/${id}`);
  dispatch({ type: DELETE_APPLICATION, payload: id });
  history.push("/");
};
