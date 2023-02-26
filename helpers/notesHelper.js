import { setItemToAsyncStorage } from "./asyncStorageHelper";
import { getCipherText } from "./cryptographyHelper";

export const updateNoteHelper = ({
  notes,
  previousNoteName,
  currentNoteName,
  content,
}) => {
  const newNotes = { ...notes };
  delete newNotes[previousNoteName];
  newNotes[currentNoteName] = {};
  newNotes[currentNoteName].name = currentNoteName;
  newNotes[currentNoteName].content = content;
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
  });
  if (passwordProtected) {
    newNotes[currentNoteName].content = getCipherText(content, password);
  }
  setItemToAsyncStorage("notes", JSON.stringify(newNotes));
};
