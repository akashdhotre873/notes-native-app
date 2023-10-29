import { setItemToAsyncStorage } from "./asyncStorageHelper";
import { sortParameter, sortOrder } from "./constants";

const sortStrings = (param1, param2, order) => {
  const sortedInAscendingOrder = order === sortOrder.ASCENDING;
  if (param1 > param2) {
    return sortedInAscendingOrder ? 1 : -1;
  } else if (param1 < param2) {
    return sortedInAscendingOrder ? -1 : 1;
  }
  return 0;
};

const sortTime = (param1, param2, order) => {
  const sortedInAscendingOrder = order === sortOrder.ASCENDING;
  const time1 = new Date(param1).getTime();
  const time2 = new Date(param2).getTime();

  return sortedInAscendingOrder ? time1 - time2 : time2 - time1;
};

const sortItems = (param1, param2, sortParam, order) => {
  if (sortParam === sortParameter.NAME) {
    return sortStrings(param1.name, param2.name, order);
  }

  if (sortParam === sortParameter.LAST_MODIFIED) {
    return sortTime(param1.dateUpdated, param2.dateUpdated, order);
  }

  if (sortParam === sortParameter.DATE_CREATED) {
    return sortTime(param1.dateCreated, param2.dateCreated, order);
  }
};

export const sortNotes = (note1, note2, sortParam, order) => {
  return sortItems(note1, note2, sortParam, order);
};

export const sortTodos = (todo1, todo2, sortParam, order) => {
  return sortItems(todo1, todo2, sortParam, order);
};

export const updateSortingInfoInAsync = ({
  allSortingInfo,
  sortItem,
  sortOrder,
  sortParameter,
}) => {
  allSortingInfo[sortItem] = {
    selectedSortOrder: sortOrder,
    selectedSortParameter: sortParameter,
  };
  setItemToAsyncStorage("sortingInfo", JSON.stringify(allSortingInfo));
};
