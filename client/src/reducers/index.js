import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import applicationReducer from "./applicationReducer";

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  applications: applicationReducer
});
