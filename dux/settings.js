import { defaultSettings, settingTypes } from '../helpers/constants';

const LOAD_INITIAL_SETTINGS = `[settings] load initial settings`;
const UPDATE_TIME_FORMAT = `[settings] update time format`;

export const loadInitialSettings = (settings) => ({
  type: LOAD_INITIAL_SETTINGS,
  payload: settings,
});

export const updateTimeFormat = (formatString) => ({
  type: UPDATE_TIME_FORMAT,
  payload: formatString,
});

const initialState = defaultSettings;

const settingsReducer = (state = initialState, action) => {
  if (action.type === LOAD_INITIAL_SETTINGS) {
    return action.payload;
  }

  if (action.type === UPDATE_TIME_FORMAT) {
    return { ...state, [settingTypes.TIME_FORMAT]: action.payload };
  }

  return state;
};

export default settingsReducer;

// selectors
export const getTimeFormat = ({ settings }) =>
  settings[settingTypes.TIME_FORMAT];

export const getSettings = ({ settings }) => settings;
