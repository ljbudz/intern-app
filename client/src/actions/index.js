import {
  CREATE_APPLICATION,
  EDIT_APPLICATION,
  DELETE_APPLICATION,
  FETCH_APPLICATION,
  FETCH_APPLICATIONS,
  SET_CURRENT_USER,
  GET_ERRORS,
  LOADING_USER
} from "./types";
import history from "../history";
import application from "../apis/applications";
import auth from "../apis/auth";

export const logInUser = (formValues) => (dispatch) => {
  auth
    .post("/login", formValues)
    .then((res) => {
      dispatch(getCurrentUserData());
    })
    .catch((err) => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

export const getCurrentUserData = () => (dispatch) => {
  dispatch(loadingUser());
  auth
    .get("/verify")
    .then((res) => {
      dispatch(setCurrentUser(res.data));
    })
    .catch((err) => {
      dispatch({ type: GET_ERRORS, payload: err.response });
    });
};

export const setCurrentUser = (userData) => {
  if (history.location.pathname === "/login") {
    history.push("/applications");
  }
  return {
    type: SET_CURRENT_USER,
    payload: userData
  };
};

export const loadingUser = () => {
  return {
    type: LOADING_USER
  };
};

export const logOutUser = () => (dispatch) => {
  auth
    .get("/logout")
    .then((res) => dispatch(setCurrentUser({})))
    .catch((err) => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

export const createApplication = (formValues) => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const response = await application.post("/applications", { ...formValues, userId });
  dispatch({
    type: CREATE_APPLICATION,
    payload: response.data
  });
  history.push("/");
};

export const fetchApplications = () => async (dispatch) => {
  const response = await application.get("/applications");
  dispatch({ type: FETCH_APPLICATIONS, payload: response.data });
};

export const fetchApplication = (id) => async (dispatch) => {
  const response = await application.get(`/applications/${id}`);
  dispatch({ type: FETCH_APPLICATION, payload: response.data });
};

export const editApplication = (id, formValues) => async (dispatch) => {
  const response = await application.patch(`/applications/${id}`, formValues);
  dispatch({ type: EDIT_APPLICATION, payload: response.data });
  history.push(`/applications/${id}`);
};

export const deleteApplication = (id) => async (dispatch) => {
  await application.delete(`/applications/${id}`);
  dispatch({ type: DELETE_APPLICATION, payload: id });
  history.push("/");
};
