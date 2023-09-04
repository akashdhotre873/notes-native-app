const SET_WARNINGS = `[warnings] set warnings`;

export const setWarningsList = ({ warningsList }) => ({
  type: SET_WARNINGS,
  payload: warningsList,
});

const initialState = [];

const warningsReducer = (state = initialState, action) => {
  if (action.type === SET_WARNINGS) {
    return action.payload;
  }

  return state;
};

export default warningsReducer;

// selectors
export const getWarnings = ({ warnings }) => warnings;
