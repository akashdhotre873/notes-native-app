import { configureStore } from "@reduxjs/toolkit";
import { notesReducer } from "../dux/notes";

export default configureStore({
  reducer: {
    notes: notesReducer,
  },
});
