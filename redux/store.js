import { configureStore } from "@reduxjs/toolkit";
import auditReducer from "./features/auditSlice";

export const store = configureStore({
  reducer: {
    audit: auditReducer,
  },
});
