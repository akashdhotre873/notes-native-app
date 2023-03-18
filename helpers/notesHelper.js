import { setItemToAsyncStorage } from "./asyncStorageHelper";

export const updateNoteHelper = ({
  notes,
  previousNoteName,
  currentNoteName,
  content,
  passwordProtected,
  passwordHash,
  salt,
}) => {
  const newNotes = { ...notes };
  delete newNotes[previousNoteName];
  newNotes[currentNoteName] = {};
  newNotes[currentNoteName].name = currentNoteName;
  newNotes[currentNoteName].content = content;
  newNotes[currentNoteName].passwordProtected = passwordProtected;
  newNotes[currentNoteName].passwordHash = passwordHash;
  newNotes[currentNoteName].salt = salt;
  return newNotes;
};

export const updateNoteInAsyncStorage = ({
  notes,
  previousNoteName,
  currentNoteName,
  content,
  passwordProtected,
  passwordHash,
  salt,
}) => {
  const newNotes = updateNoteHelper({
    notes,
    previousNoteName,
    content,
    currentNoteName,
    passwordProtected,
    passwordHash,
    salt,
  });
  setItemToAsyncStorage("notes", JSON.stringify(newNotes));
};

export const deleteNoteInAsyncStorage = ({ notes, noteName }) => {
  delete notes[noteName];
  setItemToAsyncStorage("notes", JSON.stringify(notes));
};
