import { setItemToAsyncStorage } from "./asyncStorageHelper";

export const updateNoteHelper = ({
  notes,
  previousNoteName,
  currentNoteName,
  content,
  passwordProtected,
  passwordHash,
  salt,
  dateUpdated,
}) => {
  const newNotes = { ...notes };
  delete newNotes[previousNoteName];
  newNotes[currentNoteName] = {};
  newNotes[currentNoteName].name = currentNoteName;
  newNotes[currentNoteName].content = content;
  newNotes[currentNoteName].passwordProtected = passwordProtected;
  newNotes[currentNoteName].passwordHash = passwordHash;
  newNotes[currentNoteName].salt = salt;
  newNotes[currentNoteName].dateUpdated = dateUpdated.toString();
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
  dateUpdated,
}) => {
  const newNotes = updateNoteHelper({
    notes,
    previousNoteName,
    content,
    currentNoteName,
    passwordProtected,
    passwordHash,
    salt,
    dateUpdated,
  });
  setItemToAsyncStorage("notes", JSON.stringify(newNotes));
};

export const deleteNoteInAsyncStorage = ({ notes, noteName }) => {
  delete notes[noteName];
  setItemToAsyncStorage("notes", JSON.stringify(notes));
};

export const formatNoteToShare = (note) => {
  const { name, content: noteContent } = note;
  return name + "\n\n" + noteContent;
};
