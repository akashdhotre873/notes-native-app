export const promptCategoryType = {
  CREATE_PASSWORD_PROMPT: 'create password prompt',
  CONFIRM_PASSWORD_PROMPT: 'confirm password prompt',
  ERROR_PROMPT: 'error prompt',
  EXIT_WITHOUT_SAVING_PROMPT: 'exit without saving',
  DELETE_NOTE_PROMPT: 'delete note',
  DELETE_TODO_PROMPT: 'delete todo',
  UPDATE_TASK_STATUS_PROMPT: 'update task status',
  UPDATE_TODO_STATUS_PROMPT: 'update todo status',
  FIRST_APP_LOAD_WARNING_PROMPT: 'first app load warning',
};

export const errorMessages = {
  WRONG_PASSWORD: 'Please enter right password',
};

export const colors = {
  primaryColor: '#006efe',
  lockedColor: '#fe9a03',
  unlockedColor: '#01eb00',
};

export const dataType = {
  NOTE: 'NOTE',
  TODO: 'TODO',
};

export const shareMethod = {
  CLIPBOARD: 'CLIPBOARD',
  EXTERANL_DIALOG: 'EXTERNAL_DIALOG',
};

export const tabs = [
  {
    name: 'Notes',
    value: 'notes',
  },
  {
    name: 'Todos',
    value: 'todos',
  },
];

export const todoStatus = {
  CREATED: 'CREATED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  UNSURE: 'UNSURE',
};

export const taskStatus = {
  CREATED: 'CREATED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  UNSURE: 'UNSURE',
};

export const warnings = {
  FIRST_APP_LOAD_WARNING: 'FIRST_APP_LOAD_WARNING',
};

export const sortOrder = {
  ASCENDING: 'ASCENDING',
  DESCENDING: 'DESCENDING',
};

export const sortParameter = {
  NAME: 'name',
  DATE_CREATED: 'DATE_CREATED',
  LAST_MODIFIED: 'LAST_MODIFIED',
};

export const defaultSortingInfo = {
  [dataType.NOTE]: {
    selectedSortParameter: sortParameter.NAME,
    selectedSortOrder: sortOrder.ASCENDING,
  },
  [dataType.TODO]: {
    selectedSortParameter: sortParameter.NAME,
    selectedSortOrder: sortOrder.ASCENDING,
  },
};

export const timeFormats = [
  {
    format: '{hour}:{minute-pad}:{second-pad} {AMPM}',
    displayString: 'h:mm:ss a',
    example: '1:30:45 PM',
  },
  {
    format: '{hour-pad}:{minute-pad}:{second-pad} {AMPM}',
    displayString: 'hh:mm:ss a',
    example: '01:30:45 PM',
  },
  {
    format: '{hour-24-pad}:{minute-pad}:{second-pad}',
    displayString: 'HH:mm:ss',
    example: '13:30:45',
  },
];

export const settingTypes = {
  TIME_FORMAT: 'TIME_FORMAT',
};

export const defaultSettings = {
  [settingTypes.TIME_FORMAT]: timeFormats[0].format,
};
