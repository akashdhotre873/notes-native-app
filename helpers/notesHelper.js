import { setItemToAsyncStorage } from "./asyncStorageHelper";

export const updateNoteHelper = ({
  notes,
  previousNoteName,
  currentNoteName,
  content,
  passwordProtected,
  password,
}) => {
  const newNotes = { ...notes };
  delete newNotes[previousNoteName];
  newNotes[currentNoteName] = {};
  newNotes[currentNoteName].name = currentNoteName;
  newNotes[currentNoteName].content = content;
  newNotes[currentNoteName].passwordProtected = passwordProtected;
  newNotes[currentNoteName].password = password;
  return newNotes;
};

export const updateNoteInAsyncStorage = ({
  notes,
  previousNoteName,
  currentNoteName,
  content,
  passwordProtected,
  password,
}) => {
  const newNotes = updateNoteHelper({
    notes,
    previousNoteName,
    content,
    currentNoteName,
    passwordProtected,
    password,
  });
  setItemToAsyncStorage("notes", JSON.stringify(newNotes));
};
