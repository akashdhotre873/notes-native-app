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

export const colorType = {
  PRIMARY_COLOR: 'primaryColor',
  LOCKED_COLOR: 'lockedColor',
  UNLOCKED_COLOR: 'unlockedColor',
  SETTING_BOX_BORDER_Color: 'settingBoxBorderColor',
  SETTING_BOX_BACKGROUND_Color: 'settingBoxBackgroundColor',
  NEW_CONTENT_ICON_COLOR: 'newContentIconColor',
  ICON_PRIMARY_COLOR: 'iconPrimaryColor',
  HEADER_TEXT_COLOR: 'headerTextColor',
};

const colors = {
  [colorType.PRIMARY_COLOR]: '#006efe',
  [colorType.LOCKED_COLOR]: '#fe9a03',
  [colorType.UNLOCKED_COLOR]: '#01eb00',
  [colorType.SETTING_BOX_BORDER_Color]: 'grey',
  [colorType.SETTING_BOX_BACKGROUND_Color]: 'white',
  [colorType.NEW_CONTENT_ICON_COLOR]: '#006efe',
  [colorType.ICON_PRIMARY_COLOR]: 'black',
  [colorType.HEADER_TEXT_COLOR]: 'black',
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

export const newContentIconPosition = {
  RIGHT: 'right',
  LEFT: 'left',
};

export const settingTypes = {
  TIME_FORMAT: 'TIME_FORMAT',
  NEW_CONTENT_ICON_POSITION: 'NEW_CONTENT_ICON_POSITION',
  COLORS: 'COLORS',
};

export const defaultSettings = {
  [settingTypes.TIME_FORMAT]: timeFormats[0].format,
  [settingTypes.NEW_CONTENT_ICON_POSITION]: newContentIconPosition.RIGHT,
  [settingTypes.COLORS]: colors,
};

export const recognizedColors = [
  'aliceblue',
  'antiquewhite',
  'aqua',
  'aquamarine',
  'azure',
  'beige',
  'bisque',
  'black',
  'blanchedalmond',
  'blue',
  'blueviolet',
  'brown',
  'burlywood',
  'cadetblue',
  'chartreuse',
  'chocolate',
  'coral',
  'cornflowerblue',
  'cornsilk',
  'crimson',
  'cyan',
  'darkblue',
  'darkcyan',
  'darkgoldenrod',
  'darkgray',
  'darkgreen',
  'darkgrey',
  'darkkhaki',
  'darkmagenta',
  'darkolivegreen',
  'darkorange',
  'darkorchid',
  'darkred',
  'darksalmon',
  'darkseagreen',
  'darkslateblue',
  'darkslategray',
  'darkslategrey',
  'darkturquoise',
  'darkviolet',
  'deeppink',
  'deepskyblue',
  'dimgray',
  'dimgrey',
  'dodgerblue',
  'firebrick',
  'floralwhite',
  'forestgreen',
  'fuchsia',
  'gainsboro',
  'ghostwhite',
  'gold',
  'goldenrod',
  'gray',
  'green',
  'greenyellow',
  'grey',
  'honeydew',
  'hotpink',
  'indianred',
  'indigo',
  'ivory',
  'khaki',
  'lavender',
  'lavenderblush',
  'lawngreen',
  'lemonchiffon',
  'lightblue',
  'lightcoral',
  'lightcyan',
  'lightgoldenrodyellow',
  'lightgray',
  'lightgreen',
  'lightgrey',
  'lightpink',
  'lightsalmon',
  'lightseagreen',
  'lightskyblue',
  'lightslategray',
  'lightslategrey',
  'lightsteelblue',
  'lightyellow',
  'lime',
  'limegreen',
  'linen',
  'magenta',
  'maroon',
  'mediumaquamarine',
  'mediumblue',
  'mediumorchid',
  'mediumpurple',
  'mediumseagreen',
  'mediumslateblue',
  'mediumspringgreen',
  'mediumturquoise',
  'mediumvioletred',
  'midnightblue',
  'mintcream',
  'mistyrose',
  'moccasin',
  'navajowhite',
  'navy',
  'oldlace',
  'olive',
  'olivedrab',
  'orange',
  'orangered',
  'orchid',
  'palegoldenrod',
  'palegreen',
  'paleturquoise',
  'palevioletred',
  'papayawhip',
  'peachpuff',
  'peru',
  'pink',
  'plum',
  'powderblue',
  'purple',
  'red',
  'rosybrown',
  'royalblue',
  'saddlebrown',
  'salmon',
  'sandybrown',
  'seagreen',
  'seashell',
  'sienna',
  'silver',
  'skyblue',
  'slateblue',
  'slategray',
  'slategrey',
  'snow',
  'springgreen',
  'steelblue',
  'tan',
  'teal',
  'thistle',
  'tomato',
  'turquoise',
  'violet',
  'wheat',
  'white',
  'whitesmoke',
  'yellow',
  'yellowgreen',
];
