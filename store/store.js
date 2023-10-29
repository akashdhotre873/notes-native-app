import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "../dux/notes";
import promptReducer from "../dux/prompt";
import tabsReducer from "../dux/tabs";
import todosReducer from "../dux/todos";
import warningsReducer from "../dux/warnings";
import sortReducer from "../dux/sort";

export default configureStore({
  reducer: {
    notes: notesReducer,
    todos: todosReducer,
    prompt: promptReducer,
    tabs: tabsReducer,
    warnings: warningsReducer,
    sorting: sortReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});
