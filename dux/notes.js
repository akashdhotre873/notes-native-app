import { updateNoteHelper } from "../helpers/notesHelper";

const SET_NOTES = `[notes] set notes`;
const UPDATE_NOTE = `[notes] update note`;
const DELETE_NOTE = `[notes] delete note`;

export const setNotes = ({ notes }) => ({
  type: SET_NOTES,
  payload: notes,
});

export const deleteNote = ({ noteName }) => ({
  type: DELETE_NOTE,
  payload: { noteName },
});

export const updateNote = ({
  previousNoteName,
  currentNoteName,
  content,
  passwordProtected,
  passwordHash,
  salt,
  dateUpdated,
  dateCreated,
}) => ({
  type: UPDATE_NOTE,
  payload: {
    previousNoteName,
    currentNoteName,
    content,
    passwordProtected,
    passwordHash,
    salt,
    dateUpdated,
    dateCreated,
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

  if (action.type === DELETE_NOTE) {
    const { noteName } = action.payload;
    delete state[noteName];
    return { ...state };
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
