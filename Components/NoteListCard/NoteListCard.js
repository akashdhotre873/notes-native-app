import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { promptCategoryType } from "../../dux/constants";
import { showPrompt } from "../../dux/prompt";
import { getPlainText } from "../../helpers/cryptographyHelper";
import { NOTE_EDITOR_SCREEN_PATH } from "../../helpers/pagePathHelper";

export const NoteListCard = (note) => {
  const { name, content, index, passwordProtected, passwordHash, salt } = note;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const openNote = (password) => {
    const plainText = getPlainText(content, password);
    const newNote = { ...note };
    newNote.content = plainText;
    navigation.navigate(NOTE_EDITOR_SCREEN_PATH, { ...newNote, password });
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
      navigation.navigate(NOTE_EDITOR_SCREEN_PATH, note);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={onPress}>
        <Text style={styles.name}>
          {index + 1}. {name}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 7,
    marginHorizontal: 10,
    marginVertical: 4,
    borderBottomWidth: 1,
  },
  name: {
    fontSize: 20,
  },
});
