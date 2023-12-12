import { defaultSettings, settingTypes } from '../helpers/constants';

const LOAD_INITIAL_SETTINGS = `[settings] load initial settings`;
const UPDATE_TIME_FORMAT = `[settings] update time format`;
const UPDATE_NEW_CONTENT_ICON_DEFAULT_POSITION = `[settings] update new content icon default position`;

export const loadInitialSettings = (settings) => ({
  type: LOAD_INITIAL_SETTINGS,
  payload: settings,
});

export const updateTimeFormat = (formatString) => ({
  type: UPDATE_TIME_FORMAT,
  payload: formatString,
});

export const updateNewContentIconDefaultPosition = (positionString) => ({
  type: UPDATE_NEW_CONTENT_ICON_DEFAULT_POSITION,
  payload: positionString,
});

const initialState = defaultSettings;

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_INITIAL_SETTINGS:
      return { ...state, ...action.payload };

    case UPDATE_TIME_FORMAT:
      return { ...state, [settingTypes.TIME_FORMAT]: action.payload };

    case UPDATE_NEW_CONTENT_ICON_DEFAULT_POSITION:
      return {
        ...state,
        [settingTypes.NEW_CONTENT_ICON_POSITION]: action.payload,
      };

    default:
      return state;
  }
};

export default settingsReducer;

// selectors
export const getTimeFormat = ({ settings }) =>
  settings[settingTypes.TIME_FORMAT];

export const getSettings = ({ settings }) => settings;

export const getNewContentIconPosition = ({ settings }) =>
  settings[settingTypes.NEW_CONTENT_ICON_POSITION];
