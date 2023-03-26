const SET_SELECTED_TAB = `[tabs] set selected tab`;

export const setSelectedTab = (tabName) => ({
  type: SET_SELECTED_TAB,
  payload: tabName,
});

const initialState = {
  selectedTab: "notes",
};

const tabsReducer = (state = initialState, action) => {
  if (action.type === SET_SELECTED_TAB) {
    return { selectedTab: action.payload };
  }
  return state;
};

export default tabsReducer;

// selectors
export const getSelectedTab = ({ tabs: { selectedTab } }) => selectedTab;
