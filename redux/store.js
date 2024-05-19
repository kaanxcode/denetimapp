import { configureStore } from "@reduxjs/toolkit";
import auditReducer from "./features/auditSlice";
import userReducer from "./features/userSlice";
import cameraReducer from "./features/cameraSlice";

export const store = configureStore({
  reducer: {
    audit: auditReducer,
    user: userReducer,
    camera: cameraReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
