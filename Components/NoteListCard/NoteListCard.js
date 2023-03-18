import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { promptCategoryType } from "../../helpers/constants";
import { showPrompt } from "../../dux/prompt";
import { getPlainText } from "../../helpers/cryptographyHelper";
import { NOTE_EDITOR_SCREEN_PATH } from "../../helpers/pagePathHelper";

export const NoteListCard = (note) => {
  const { name, content, passwordProtected, passwordHash, salt } = note;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const openNote = (password) => {
    const plainText = getPlainText(content, password);
    const newNote = { ...note };
    newNote.content = plainText;
    navigation.navigate(NOTE_EDITOR_SCREEN_PATH, {
      ...newNote,
      password,
      newNote: false,
    });
  };

  const onPress = () => {
    if (passwordProtected) {
      dispatch(
        showPrompt({
          category: promptCategoryType.CONFIRM_PASSWORD_PROMPT,
          data: { onAccept: openNote, passwordHash, salt },
        })
      );
    } else {
      navigation.navigate(NOTE_EDITOR_SCREEN_PATH, { ...note, newNote: false });
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={onPress}>
        <Text style={styles.name}>{name}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    marginHorizontal: 10,
    marginVertical: 4,
    backgroundColor: "white",
    borderRadius: 5,
    elevation: 5,
  },
  name: {
    fontSize: 24,
    paddingLeft: 15,
  },
});
