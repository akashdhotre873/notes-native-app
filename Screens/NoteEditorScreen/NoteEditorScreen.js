import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  BackHandler,
  Alert,
} from "react-native";
import { ActionBar } from "../../components/ActionBar";
import { useRoute, useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native";
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
import { promptCategoryType } from "../../helpers/constants";
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
    passwordHash,
    password,
    salt,
    dateUpdated: dateUpdatedString,
    newNote,
  } = route?.params || {};

  const getUpdatedDate = (dateString) => {
    return Boolean(dateString) ? new Date(dateString) : new Date();
  };

  const [title, setTitle] = useState(header);
  const [content, setContent] = useState(originalContent);
  const [passwordProtected, setPasswordProtected] = useState(hasPassword);
  const [contentIsSaved, setContentIsSaved] = useState(true);
  const [error, setError] = useState({});
  const [dateUpdated, setDateUpdated] = useState(
    getUpdatedDate(dateUpdatedString)
  );
  const contentRef = useRef();
  const previousNoteName = useRef(header);

  const checkIfTitleExists = () => {
    const sameTitleExists = Object.keys(notes).some(
      (currentheader) =>
        currentheader.trim() === title?.trim() && currentheader !== header
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
    let contentToSave = content;
    let salt;
    let updatedHashOfPassword;
    if (hasPassword) {
      contentToSave = getCipherText(content, password);
      salt = getUUID();
      updatedHashOfPassword = getHash(password, salt);
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
    });

    previousNoteName.current = title;
  };

  const saveIconClick = () => {
    if (checkIfTitleExists()) {
      return;
    } else {
      saveNote({ hasPassword: passwordProtected, password });
    }
  };

  const getActionBarProps = () => {
    if (!title?.trim() || contentIsSaved)
      return {
        rightIconLink: () => {},
        rightIconSource: require("../../assets/icons/saveInactiveButtonIcon.png"),
      };

    return {
      rightIconLink: saveIconClick,
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
        data: { noteName: title },
      })
    );
  };

  const backAction = () => {
    if (contentIsSaved) {
      return false;
    }
    dispatch(
      showPrompt({
        category: EXIT_WITHOUT_SAVING_PROMPT,
        data: { onAccept: () => navigation.goBack() },
      })
    );
    return true;
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
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <TouchableWithoutFeedback>
          <View>
            <ActionBar
              title={newNote ? "Creating note" : "Editing note"}
              leftIconSource={require("../../assets/icons/backButtonIcon.png")}
              leftIconLink={() => navigation.goBack()}
              {...getActionBarProps()}
              onDelete={!newNote && onDelete}
            />
            {error.hasError && (
              <View style={styles.errorMessageContainer}>
                <Text style={styles.errorMessage}>({error.errorMessage})</Text>
              </View>
            )}
            <AddPasswordArea
              onSave={saveNote}
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
