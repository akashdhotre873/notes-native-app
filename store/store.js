import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "../dux/notes";
import promptReducer from "../dux/prompt";

export default configureStore({
  reducer: {
    notes: notesReducer,
    prompt: promptReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
