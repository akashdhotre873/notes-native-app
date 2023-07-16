import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "../dux/notes";
import promptReducer from "../dux/prompt";
import tabsReducer from "../dux/tabs";
import todosReducer from "../dux/todos";

export default configureStore({
  reducer: {
    notes: notesReducer,
    todos: todosReducer,
    prompt: promptReducer,
    tabs: tabsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});
