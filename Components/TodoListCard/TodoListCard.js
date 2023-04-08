import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View, Pressable, Text } from "react-native";
import { useDispatch } from "react-redux";
import { colors, promptCategoryType } from "../../helpers/constants";
import { getPlainText } from "../../helpers/cryptographyHelper";
import { TODO_EDITOR_SCREEN_PATH } from "../../helpers/pagePathHelper";
import { getDateString, getTimeString } from "../../helpers/timeHelper";
import { showPrompt } from "../../dux/prompt";
import { FontAwesome5 } from "@expo/vector-icons";

export const TodoListCard = ({
  todo,
  selectedTodoName,
  setSelectedTodoName,
}) => {
  const {
    name,
    tasks,
    passwordProtected,
    passwordHash,
    salt,
    dateUpdated: dateUpdatedString,
  } = todo;
  const dateUpdated = new Date(dateUpdatedString);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const openNote = (password) => {
    const plainText = getPlainText(tasks, password);
    const newTodo = { ...todo };
    newTodo.tasks = plainText;
    navigation.navigate(TODO_EDITOR_SCREEN_PATH, {
      ...newTodo,
      password,
      newTodo: false,
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
      navigation.navigate(TODO_EDITOR_SCREEN_PATH, { ...todo, newTodo: false });
    }
  };

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View
        style={
          passwordProtected
            ? styles.colorIndicatorLocked
            : styles.colorIndicatorNotLocked
        }
      />

      <View style={styles.innerContainer}>
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
      </View>
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
  selectedToDelete: {
    backgroundColor: "#f0ad4e",
  },
  innerContainer: {
    paddingVertical: 7,
    flexDirection: "row",
    justifyContent: "space-between",
    flexGrow: 1,
  },
  todoTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "65%",
  },
  name: {
    fontSize: 24,
    paddingLeft: 15,
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
});
