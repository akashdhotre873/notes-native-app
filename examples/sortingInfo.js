import { dataType, sortOrder, sortParameter } from "../helpers/constants";

const sortingInfo = {
  [dataType.NOTE]: {
    selectedSortParameter: sortParameter.NAME,
    selectedSortOrder: sortOrder.ASCENDING,
  },
  [dataType.TODO]: {
    selectedSortParameter: sortParameter.NAME,
    selectedSortOrder: sortOrder.ASCENDING,
  },
};
