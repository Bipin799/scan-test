import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user/reducer";
import patientFormReducer from "./patient/patientFormSlice";

const rootReducer = combineReducers({
  user: userReducer,
  patientForm: patientFormReducer,
});

export default rootReducer;
