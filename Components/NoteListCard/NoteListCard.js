import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { colors, promptCategoryType } from "../../helpers/constants";
import { showPrompt } from "../../dux/prompt";
import { getPlainText } from "../../helpers/cryptographyHelper";
import { NOTE_EDITOR_SCREEN_PATH } from "../../helpers/pagePathHelper";
import { getDateString, getTimeString } from "../../helpers/timeHelper";
import { FontAwesome5 } from "@expo/vector-icons";

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
    <Pressable
      style={[
        styles.container,
        selectedNoteName === name ? styles.selectedToDelete : {},
      ]}
      onPress={onPress}
      onLongPress={() => setSelectedNoteName(toggleName)}
    >
      <View
        style={
          passwordProtected
            ? styles.colorIndicatorLocked
            : styles.colorIndicatorNotLocked
        }
      />
      <Pressable style={styles.innerContainer}>
        {/* <View style={styles.noteTitleContainer}>
          {passwordProtected ? (
            <FontAwesome5 name="lock" size={22} color="#fe9a03" />
          ) : (
            <FontAwesome5 name="lock-open" size={22} color="#01eb00" />
          )}
        </View> */}
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
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 4,
    backgroundColor: "white",
    borderRadius: 7,
    elevation: 5,
    flexDirection: "row",
  },
  selectedToDelete: {
    backgroundColor: "#f0ad4e",
  },
  innerContainer: {
    paddingVertical: 7,
    flexDirection: "row",
    justifyContent: "space-between",
    flexGrow: 1,
  },
  noteTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "65%",
  },
  name: {
    fontSize: 24,
    paddingLeft: 15,
    marginRight: 10,
    width: "67%",
    alignSelf: "center",
  },
  timeContainer: {
    paddingRight: 15,
    paddingLeft: 3,
  },
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
  lockIcon: {},
  colorIndicatorLocked: {
    backgroundColor: colors.lockedColor,
    width: 7,
    borderBottomLeftRadius: 7,
    borderTopLeftRadius: 7,
  },
  colorIndicatorNotLocked: {
    backgroundColor: colors.unlockedColor,
    width: 7,
    borderBottomLeftRadius: 7,
    borderTopLeftRadius: 7,
  },
});
