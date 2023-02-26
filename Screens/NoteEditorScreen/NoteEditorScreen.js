import { StyleSheet, View } from "react-native";
import { ActionBar } from "../../components/ActionBar";
import { useRoute, useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotes, updateNote } from "../../dux/notes";
import { updateNoteInAsyncStorage } from "../../helpers/notesHelper";
import { getCipherText } from "../../helpers/cryptographyHelper";
import { AddPasswordArea } from "../../components/AddPasswordArea/AddPasswordArea";

export const NoteEditorScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const notes = useSelector(getNotes);

  const {
    name: header,
    content: originalContent,
    passwordProtected: hasPassword,
    password,
  } = route?.params || {};

  const [title, setTitle] = useState(header);
  const [content, setContent] = useState(originalContent);
  const [passwordProtected, setpasswordProtected] = useState(hasPassword);
  const [contentIsSaved, setContentIsSaved] = useState(true);

  const saveNote = ({ hasPassword, password }) => {
    setContentIsSaved(true);
    let contentToSave = content;
    if (hasPassword) {
      contentToSave = getCipherText(content, password);
    }
    dispatch(
      updateNote({
        previousNoteName: header,
        currentNoteName: title,
        content: contentToSave,
        passwordProtected: hasPassword,
        password: password,
      })
    );
    updateNoteInAsyncStorage({
      notes: notes,
      previousNoteName: header,
      currentNoteName: title,
      content: contentToSave,
      passwordProtected: hasPassword,
      password: password,
    });
  };

  const getActionBarProps = () => {
    if (!title || contentIsSaved)
      return {
        rightIconLink: () => {},
        rightIconSource: require("../../assets/icons/saveInactiveButtonIcon.png"),
      };

    return {
      rightIconLink: () =>
        saveNote({ hasPassword: passwordProtected, password }),
      rightIconSource: require("../../assets/icons/saveActiveButtonIcon.png"),
    };
  };

  const changeTitle = (newTitle) => {
    setTitle(newTitle);
    setContentIsSaved(false);
  };

  const changeContent = (newContent) => {
    setContent(newContent);
    setContentIsSaved(false);
  };

  return (
    <View>
      <ActionBar
        title={header ? "Editing note" : "Creating note"}
        leftIconSource={require("../../assets/icons/backButtonIcon.png")}
        leftIconLink={() => navigation.goBack()}
        {...getActionBarProps()}
      />
      <AddPasswordArea
        saveNote={saveNote}
        isDisabled={false}
        passwordProtected={passwordProtected}
        setpasswordProtected={setpasswordProtected}
        password={password}
      />
      <TextInput
        placeholder="Title"
        style={styles.title}
        value={title}
        onChangeText={changeTitle}
      />
      <TextInput
        placeholder="Add note here"
        style={styles.content}
        multiline
        value={content}
        onChangeText={changeContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    paddingTop: 10,
    paddingLeft: 15,
    fontSize: 30,
  },
  content: {
    paddingTop: 10,
    paddingLeft: 15,
    fontSize: 20,
  },
});
