const SET_IS_APP_LOADED = `[appInfo] set is app loaded`;

export const setIsAppLoaded = (loaded) => ({
  type: SET_IS_APP_LOADED,
  payload: loaded,
});

const initialState = {
  loaded: false,
};

const appInfoReducer = (state = initialState, action) => {
  if (action.type === SET_IS_APP_LOADED) {
    return { ...state, loaded: action.payload };
  }

  return state;
};

export default appInfoReducer;

// selectors
export const getIsAppInfoLoaded = ({ appInfo: { loaded } }) => loaded;
