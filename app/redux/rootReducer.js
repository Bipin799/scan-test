import { combineReducers } from "@reduxjs/toolkit";

import userReducer from "./user/reducer";
import patientFormReducer from "./patient/patientFormSlice";
import productReducer from  "./../redux/product/productSlice";
import usersReducer from "./../redux/users/userSlice";
import userdataReducer from "./userdata/reducer";

const rootReducer = combineReducers({
  user: userReducer,
  patientForm: patientFormReducer,
  products: productReducer, 
  users: usersReducer,  
  usersdata: userdataReducer,
});

export default rootReducer;
