const SET_NOTES = `[notes] set notes`;
const UPDATE_NOTE = `[notes] update note`;

export const setNotes = ({ notes }) => ({
  type: SET_NOTES,
  payload: notes,
});

export const updateNote = ({ previousNoteName, currentNoteName, content }) => ({
  type: UPDATE_NOTE,
  payload: { previousNoteName, currentNoteName, content },
});

const initialState = {};

export const notesReducer = (state = initialState, action) => {
  if (action.type === SET_NOTES) {
    return action.payload;
  }
  if (action.type === UPDATE_NOTE) {
    const { previousNoteName, currentNoteName, content } = action.payload;
    const newState = { ...state };
    delete newState[previousNoteName];
    newState[currentNoteName] = {};
    newState[currentNoteName].name = currentNoteName;
    newState[currentNoteName].content = content;
    return newState;
  }
  return state;
};

export const getNotes = ({ notes }) => notes;

export const getNoteByName =
  (name) =>
  ({ notes }) =>
    notes[name];
