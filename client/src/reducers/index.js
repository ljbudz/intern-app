import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import applicationReducer from "./applicationReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  applications: applicationReducer,
  errors: errorReducer
});
