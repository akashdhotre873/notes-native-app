import { configureStore } from '@reduxjs/toolkit';

import appInfoReducer from '../dux/appInfo';
import notesReducer from '../dux/notes';
import promptReducer from '../dux/prompt';
import settingsReducer from '../dux/settings';
import sortReducer from '../dux/sort';
import tabsReducer from '../dux/tabs';
import todosReducer from '../dux/todos';
import warningsReducer from '../dux/warnings';

export default configureStore({
  reducer: {
    notes: notesReducer,
    todos: todosReducer,
    prompt: promptReducer,
    tabs: tabsReducer,
    warnings: warningsReducer,
    sorting: sortReducer,
    settings: settingsReducer,
    appInfo: appInfoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});
