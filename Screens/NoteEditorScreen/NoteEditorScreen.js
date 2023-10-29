import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  BackHandler,
  TextInput,
} from "react-native";
import { ActionBar } from "../../components/ActionBar";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotes, updateNote } from "../../dux/notes";
import { updateNoteInAsyncStorage } from "../../helpers/notesHelper";
import {
  getCipherText,
  getHash,
  getUUID,
} from "../../helpers/cryptographyHelper";
import { AddPasswordArea } from "../../components/AddPasswordArea/AddPasswordArea";
import { showPrompt } from "../../dux/prompt";
import { dataType, promptCategoryType } from "../../helpers/constants";
import { getDateString, getTimeString } from "../../helpers/timeHelper";

const { EXIT_WITHOUT_SAVING_PROMPT, DELETE_NOTE_PROMPT } = promptCategoryType;

export const NoteEditorScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const notes = useSelector(getNotes);

  const {
    name: header = "",
    content: originalContent = "",
    passwordProtected: hasPassword,
    passwordHash: passwordHashOld,
    password: passWordOld,
    salt: saltOld,
    dateUpdated: dateUpdatedString,
    dateCreated = new Date(),
    newNote: isNewNote = false,
  } = route?.params || {};

  const getUpdatedDate = (dateString) => {
    return Boolean(dateString) ? new Date(dateString) : new Date();
  };

  const [title, setTitle] = useState(header);
  const [content, setContent] = useState(originalContent);
  const [passwordProtected, setPasswordProtected] = useState(hasPassword);
  const [password, setPassword] = useState(passWordOld);
  const [passwordHash, setPasswordHash] = useState(passwordHashOld);
  const [salt, setSalt] = useState(saltOld);
  const [contentIsSaved, setContentIsSaved] = useState(true);
  const [error, setError] = useState({});
  const [newNote, setNewNote] = useState(isNewNote);
  const [dateUpdated, setDateUpdated] = useState(
    getUpdatedDate(dateUpdatedString)
  );
  const contentRef = useRef();
  const previousNoteName = useRef(header);
  const contentToShare = { dataType: dataType.NOTE, name: title, content };

  const checkIfTitleExists = () => {
    const sameTitleExists = Object.keys(notes).some(
      (otherNoteName) =>
        otherNoteName.trim() === title?.trim() &&
        otherNoteName !== previousNoteName.current
    );
    if (sameTitleExists) {
      setError({
        hasError: true,
        errorMessage: "Another note with same name exists",
      });
    } else {
      setError({});
    }

    return sameTitleExists;
  };

  const saveNote = ({ hasPassword, password }) => {
    setContentIsSaved(true);
    setNewNote(false);
    setPassword(password);
    let contentToSave = content;
    let salt;
    let updatedHashOfPassword;
    if (hasPassword) {
      contentToSave = getCipherText(content, password);
      salt = getUUID();
      updatedHashOfPassword = getHash(password, salt);
      setSalt(salt);
      setPasswordHash(updatedHashOfPassword);
    }

    const dateUpdatedLocal = new Date();
    setDateUpdated(dateUpdatedLocal);

    dispatch(
      updateNote({
        previousNoteName: previousNoteName.current,
        currentNoteName: title.trim(),
        content: contentToSave,
        passwordProtected: hasPassword,
        passwordHash: updatedHashOfPassword,
        salt,
        dateUpdated: dateUpdatedLocal,
        dateCreated,
      })
    );

    updateNoteInAsyncStorage({
      notes: notes,
      previousNoteName: previousNoteName.current,
      currentNoteName: title.trim(),
      content: contentToSave,
      passwordProtected: hasPassword,
      passwordHash: updatedHashOfPassword,
      salt,
      dateUpdated: dateUpdatedLocal,
      dateCreated,
    });

    previousNoteName.current = title;
  };

  const checkAndSaveNote = ({ password, hasPassword }) => {
    if (checkIfTitleExists()) {
      return false;
    } else {
      saveNote({ hasPassword, password });
      return true;
    }
  };

  const getActionBarProps = () => {
    if (!title?.trim() || contentIsSaved)
      return {
        rightIconLink: () => {},
        rightIconSource: require("../../assets/icons/saveInactiveButtonIcon.png"),
      };

    return {
      rightIconLink: () =>
        checkAndSaveNote({ hasPassword: passwordProtected, password }),
      rightIconSource: require("../../assets/icons/saveActiveButtonIcon.png"),
    };
  };

  const changeTitle = (newTitle) => {
    setContentIsSaved(false);
    setTitle(newTitle);
  };

  const changeContent = (newContent) => {
    setContentIsSaved(false);
    setContent(newContent);
  };

  const onPress = () => {
    contentRef.current?.focus();
  };

  const onDelete = () => {
    dispatch(
      showPrompt({
        category: DELETE_NOTE_PROMPT,
        data: { noteName: previousNoteName.current },
      })
    );
  };

  const goBack = () => {
    if (contentIsSaved) {
      navigation.goBack();
      return;
    }
    dispatch(
      showPrompt({
        category: EXIT_WITHOUT_SAVING_PROMPT,
        data: { onAccept: () => navigation.goBack() },
      })
    );
  };

  const backAction = () => {
    if (contentIsSaved) {
      const canExit = false;
      return canExit;
    }
    dispatch(
      showPrompt({
        category: EXIT_WITHOUT_SAVING_PROMPT,
        data: { onAccept: () => navigation.goBack() },
      })
    );
    const canNotExit = true;
    return canNotExit;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [contentIsSaved]);

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <TouchableWithoutFeedback>
        <View>
          <ActionBar
            title={newNote ? "Creating note" : "Editing note"}
            leftIconSource={require("../../assets/icons/backButtonIcon.png")}
            leftIconLink={goBack}
            {...getActionBarProps()}
            onDelete={!newNote && onDelete}
            contentToShare={!newNote && contentToShare} // can't share a note till it's saved
            allowCopyToClicpBoard={true}
          />
          {error.hasError && (
            <View style={styles.errorMessageContainer}>
              <Text style={styles.errorMessage}>({error.errorMessage})</Text>
            </View>
          )}
          <AddPasswordArea
            onSave={checkAndSaveNote}
            isDisabled={!title?.trim()}
            passwordProtected={passwordProtected}
            setPasswordProtected={setPasswordProtected}
            passwordHash={passwordHash}
            salt={salt}
          />

          <TextInput
            placeholder="Title"
            style={styles.title}
            value={title}
            onChangeText={changeTitle}
            autoFocus={!title}
          />
          {dateUpdated && (
            <View style={styles.timeContainer}>
              <Text style={styles.dateModifiedText}>
                {getTimeString(dateUpdated)}
              </Text>
              <Text style={styles.dateModifiedText}>
                {getDateString(dateUpdated)}
              </Text>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
      <ScrollView style={styles.container} keyboardShouldPersistTaps="always">
        <TextInput
          placeholder="Add note here"
          style={styles.content}
          multiline
          value={content}
          onChangeText={changeContent}
          ref={contentRef}
        />
        <View style={styles.marginBottom} />
      </ScrollView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    paddingTop: 10,
    paddingLeft: 15,
    paddingRight: 10,
    fontSize: 30,
    marginHorizontal: 5,
  },
  content: {
    paddingTop: 10,
    paddingLeft: 15,
    paddingRight: 10,
    fontSize: 20,
    marginHorizontal: 5,
  },
  marginBottom: {
    paddingVertical: 10,
  },
  errorMessageContainer: {
    alignSelf: "center",
  },
  errorMessage: {
    color: "red",
    paddingTop: 2,
    fontSize: 12,
  },
  dateModifiedText: {
    marginHorizontal: 5,
    paddingLeft: 15,
    opacity: 0.5,
    fontSize: 11,
    marginTop: 5,
    marginBottom: 10,
  },
  timeContainer: {
    flexDirection: "row",
  },
});
