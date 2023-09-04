import { setItemToAsyncStorage } from "./asyncStorageHelper";

export const updateWarningList = ({ warningsList, warning }) => {
  const filteredWarning = warningsList.filter(
    (currentWarning) => currentWarning.name !== warning.name
  );
  filteredWarning.push(warning);
  return filteredWarning;
};

export const updateWarningsInAsyncStorage = ({
  warningsList,
  warningName,
  warned,
}) => {
  const warning = { name: warningName, warned };
  const updatedWarningsList = updateWarningList({ warningsList, warning });
  setItemToAsyncStorage("warnings", JSON.stringify(updatedWarningsList));
};
