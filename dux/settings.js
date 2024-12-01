import {
  lightSchemeColors,
  colorSchemes,
  darkSchemeColors,
  defaultSettings,
  settingTypes,
} from '../helpers/constants';

const LOAD_INITIAL_SETTINGS = `[settings] load initial settings`;
const UPDATE_TIME_FORMAT = `[settings] update time format`;
const UPDATE_NEW_CONTENT_ICON_DEFAULT_POSITION = `[settings] update new content icon default position`;
const UPDATE_COLOR = `[settings] update color`;
const UPDATE_COLOR_SCHEME = `[settings] update color scheme`;

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

export const updateColor = ({ colorType, color }) => ({
  type: UPDATE_COLOR,
  payload: { colorType, color },
});

export const updateColorScheme = ({ colorScheme }) => ({
  type: UPDATE_COLOR_SCHEME,
  payload: { colorScheme },
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

    case UPDATE_COLOR: {
      const { color, colorType } = action.payload;
      return {
        ...state,
        [settingTypes.COLORS]: {
          ...state[settingTypes.COLORS],
          [colorType]: color,
        },
      };
    }

    case UPDATE_COLOR_SCHEME: {
      const { colorScheme } = action.payload;
      return {
        ...state,
        [settingTypes.COLOR_SCHEME]: colorScheme,
      };
    }

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

export const getColors = ({ settings }) => {
  const schemeColors = {
    [colorSchemes.LIGHT]: lightSchemeColors,
    [colorSchemes.DARK]: darkSchemeColors,
    [colorSchemes.CUSTOM]: settings[settingTypes.COLORS],
  };
  const currentColorScheme = settings[settingTypes.COLOR_SCHEME];

  return {
    ...lightSchemeColors, // returns default color from light scheme if not set in custom scheme
    ...schemeColors[currentColorScheme],
  };
};

// export const getColors = ({ settings }) => settings[settingTypes.COLORS];

export const getColorScheme = ({ settings }) =>
  settings[settingTypes.COLOR_SCHEME];
