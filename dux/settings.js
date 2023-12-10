import { defaultSettings, settingTypes } from '../helpers/constants';

const UPDATE_TIME_FORMAT = `[settings] update time format`;

export const updateTimeFormat = (formatString) => ({
  type: UPDATE_TIME_FORMAT,
  payload: formatString,
});

const initialState = defaultSettings;

const settingsReducer = (state = initialState, action) => {
  if (action.type === UPDATE_TIME_FORMAT) {
    return { ...state, [settingTypes.TIME_FORMAT]: action.payload };
  }

  return state;
};

export default settingsReducer;

// selectors
export const getTimeFormat = ({ settings }) =>
  settings[settingTypes.TIME_FORMAT];
