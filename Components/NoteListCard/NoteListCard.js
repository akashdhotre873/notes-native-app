import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { promptCategoryType } from "../../helpers/constants";
import { showPrompt } from "../../dux/prompt";
import { getPlainText } from "../../helpers/cryptographyHelper";
import { NOTE_EDITOR_SCREEN_PATH } from "../../helpers/pagePathHelper";
import { getDateString, getTimeString } from "../../helpers/timeHelper";

export const NoteListCard = ({
  note,
  selectedNoteName,
  setSelectedNoteName,
}) => {
  const {
    name,
    content,
    passwordProtected,
    passwordHash,
    salt,
    dateUpdated: dateUpdatedString,
  } = note;

  const dateUpdated = new Date(dateUpdatedString);
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

  const toggleName = (previousName) => {
    return previousName === name ? "" : name;
  };

  return (
    <View
      style={[
        styles.container,
        selectedNoteName === name ? styles.selectedToDelete : {},
      ]}
    >
      <Pressable
        onPress={onPress}
        onLongPress={() => setSelectedNoteName(toggleName)}
        style={styles.innerContainer}
      >
        <Text style={styles.name}>{name}</Text>

        <View style={styles.timeContainer}>
          <Text style={styles.lastModifiedText}>Last Modified :</Text>
          <Text style={styles.dateModifiedText}>
            {getTimeString(dateUpdated)}
          </Text>
          <Text style={styles.dateModifiedText}>
            {getDateString(dateUpdated)}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 7,
    marginHorizontal: 10,
    marginVertical: 4,
    backgroundColor: "white",
    borderRadius: 7,
    elevation: 5,
  },
  selectedToDelete: {
    backgroundColor: "#f0ad4e",
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  name: {
    fontSize: 24,
    width: "70%",
  },
  timeContainer: {},
  dateModifiedText: {
    marginLeft: "auto",
    opacity: 0.5,
    fontSize: 12,
  },
  lastModifiedText: {
    marginLeft: "auto",
    fontSize: 12,
    opacity: 0.9,
  },
});
