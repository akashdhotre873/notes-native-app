import { updateNoteHelper } from "../helpers/notesHelper";

const SET_NOTES = `[notes] set notes`;
const UPDATE_NOTE = `[notes] update note`;

export const setNotes = ({ notes }) => ({
  type: SET_NOTES,
  payload: notes,
});

export const updateNote = ({
  previousNoteName,
  currentNoteName,
  content,
  passwordProtected,
  passwordHash,
  salt,
}) => ({
  type: UPDATE_NOTE,
  payload: {
    previousNoteName,
    currentNoteName,
    content,
    passwordProtected,
    passwordHash,
    salt,
  },
});

const initialState = {};

const notesReducer = (state = initialState, action) => {
  if (action.type === SET_NOTES) {
    return action.payload;
  }

  if (action.type === UPDATE_NOTE) {
    return updateNoteHelper({
      notes: state,
      ...action.payload,
    });
  }

  return state;
};

export default notesReducer;

// selectors
export const getNotes = ({ notes }) => notes;

export const getNoteByName =
  (name) =>
  ({ notes }) =>
    notes[name];
