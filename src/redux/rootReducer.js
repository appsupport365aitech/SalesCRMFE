import { combineReducers } from "@reduxjs/toolkit";
import apiReducer from "./slice/apiSlice.js";
import filterSlice from "./slice/filterSlice.js";
import userSlice from "./slice/userSlice.js";
import parentSlice from "./slice/parentSlice.js";
import customerSlice from "./slice/customerSlice.js";
import UISlice from "./slice/UISlice.js";
import AISlice from "./slice/aiSlice.js";
import authSlice from "./slice/authSlice.js";
// import chatSlice from "./slice/chatSlice.js";

const rootReducer = combineReducers({
  api: apiReducer,
  filter: filterSlice,
  profile: userSlice,
  parent: parentSlice,
  customer: customerSlice,
  ui: UISlice,
  ai: AISlice,
  auth: authSlice
  // chat: chatSlice,
});

export default rootReducer;
