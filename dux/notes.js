const SET_NOTES = `[notes] set notes`;

export const setNotes = ({ notes }) => ({
  type: SET_NOTES,
  payload: notes,
});

const initialState = {};

export const notesReducer = (state = initialState, action) => {
  if (action.type === SET_NOTES) {
    return action.payload;
  }
  return state;
};

export const getNotes = ({ notes }) => notes;

export const getNoteByName =
  (name) =>
  ({ notes }) =>
    notes[name];
