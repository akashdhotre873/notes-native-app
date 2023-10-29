import { defaultSortingInfo } from "../helpers/constants";

const UPDATE_SORT_INFO = `[sort] update sort info`;
const LOAD_INITIAL_SORT_INFO = `[sort] load initial sort info`;

export const updateSortInfo = ({ sortParameter, sortOrder, sortItem }) => ({
  type: UPDATE_SORT_INFO,
  payload: { sortParameter, sortOrder, sortItem },
});

export const loadInitialSortInfo = (sortingInfo) => ({
  type: LOAD_INITIAL_SORT_INFO,
  payload: sortingInfo,
});

const initialState = defaultSortingInfo;

const sortReducer = (state = initialState, action) => {
  if (action.type === UPDATE_SORT_INFO) {
    const { sortItem, sortParameter, sortOrder } = action.payload;
    return {
      ...state,
      [sortItem]: {
        selectedSortOrder: sortOrder,
        selectedSortParameter: sortParameter,
      },
    };
  }

  if (action.type === LOAD_INITIAL_SORT_INFO) {
    return action.payload;
  }

  return state;
};

export default sortReducer;

// selectors
export const getAllSortInfo = ({ sorting }) => sorting;

export const getSortInfoFor =
  (sortItem) =>
  ({ sorting }) =>
    sorting[sortItem] || {};

export const getSelectedSortParameter =
  (sortItem) =>
  ({ sorting }) =>
    sorting[sortItem].selectedSortParameter;

export const getSelectedSortOrder =
  (sortItem) =>
  ({ sorting }) =>
    sorting[sortItem].selectedSortOrder;
