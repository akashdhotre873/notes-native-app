import { dataType, sortOrder, sortParameter } from "../helpers/constants";

const UPDATE_SORT_INFO = `[sort] update sort info`;

export const updateSortInfo = ({ sortParameter, sortOrder, sortItem }) => ({
  type: UPDATE_SORT_INFO,
  payload: { sortParameter, sortOrder, sortItem },
});

const initialState = {
  [dataType.NOTE]: {
    selectedSortParameter: sortParameter.NAME,
    selectedSortOrder: sortOrder.ASCENDING,
  },
  [dataType.TODO]: {
    selectedSortParameter: sortParameter.NAME,
    selectedSortOrder: sortOrder.ASCENDING,
  },
};

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

  return state;
};

export default sortReducer;

// selectors
export const getSortInfo =
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
