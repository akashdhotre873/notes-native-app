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

const { EXIT_WITHOUT_SAVING_PROMPT, DELETE_NOTE_PROMPT } = promptCategoryType;

export const NoteEditorScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const notes = useSelector(getNotes);

  const {
    name: header,
    content: originalContent,
    passwordProtected: hasPassword,
    passwordHash,
    password,
    salt,
    newNote,
  } = route?.params || {};

  const [title, setTitle] = useState(header || "");
  const [content, setContent] = useState(originalContent || "");
  const [passwordProtected, setPasswordProtected] = useState(hasPassword);
  const [contentIsSaved, setContentIsSaved] = useState(true);
  const [error, setError] = useState({});
  const contentRef = useRef();

  const checkIfTitleExists = () => {
    const sameTitleExists = Object.keys(notes).some(
      (currentheader) => currentheader === title && currentheader !== header
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
    const dateUpdated = new Date();
    dispatch(
      updateNote({
        previousNoteName: header,
        currentNoteName: title,
        content: contentToSave,
        passwordProtected: hasPassword,
        passwordHash: updatedHashOfPassword,
        salt,
        dateUpdated,
      })
    );
    updateNoteInAsyncStorage({
      notes: notes,
      previousNoteName: header,
      currentNoteName: title,
      content: contentToSave,
      passwordProtected: hasPassword,
      passwordHash: updatedHashOfPassword,
      salt,
      dateUpdated,
    });
  };

  const saveIconClick = () => {
    if (checkIfTitleExists()) {
      return;
    } else {
      saveNote({ hasPassword: passwordProtected, password });
    }
  };

  const getActionBarProps = () => {
    if (!title || contentIsSaved)
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

  const onDelete = () => {
    dispatch(
      showPrompt({
        category: DELETE_NOTE_PROMPT,
        data: { noteName: header },
      })
    );
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
      <ScrollView style={styles.container}>
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
              saveNote={saveNote}
              isDisabled={!title}
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
    fontSize: 30,
    marginHorizontal: 5,
  },
  content: {
    paddingTop: 10,
    paddingLeft: 15,
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
});
