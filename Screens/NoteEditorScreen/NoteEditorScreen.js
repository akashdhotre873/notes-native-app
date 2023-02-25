import { StyleSheet, View } from "react-native";
import { ActionBar } from "../../components/ActionBar";
import { useRoute, useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateNote } from "../../dux/notes";

export const NoteEditorScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { header, content: originalContent } = route?.params || {};
  const [title, setTitle] = useState(header);
  const [content, setContent] = useState(originalContent);

  const saveNote = () => {
    dispatch(
      updateNote({ previousNoteName: header, currentNoteName: title, content })
    );
  };

  const getActionBarProps = () => {
    if (!title || (title === header && content === originalContent))
      return {
        rightIconLink: () => {},
        rightIconSource: require("../../assets/icons/saveInactiveButtonIcon.png"),
      };

    return {
      rightIconLink: () => saveNote(),
      rightIconSource: require("../../assets/icons/saveActiveButtonIcon.png"),
    };
  };

  return (
    <View>
      <ActionBar
        title={header ? "Editing note" : "Creating note"}
        leftIconSource={require("../../assets/icons/backButtonIcon.png")}
        leftIconLink={() => navigation.goBack()}
        {...getActionBarProps()}
      />
      <TextInput
        placeholder="Title"
        style={styles.title}
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        placeholder="Add note here"
        style={styles.content}
        multiline
        value={content}
        onChangeText={setContent}
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
