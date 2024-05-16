import { configureStore } from "@reduxjs/toolkit";
import auditReducer from "./features/auditSlice";
import userReducer from "./features/userSlice";

export const store = configureStore({
  reducer: {
    audit: auditReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
