import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View, Pressable, Text } from "react-native";
import { useDispatch } from "react-redux";
import { promptCategoryType } from "../../helpers/constants";
import { getPlainText } from "../../helpers/cryptographyHelper";
import { getDateString, getTimeString } from "../../helpers/timeHelper";

export const TodoListCard = ({
  todo,
  selectedTodoName,
  setSelectedTodoName,
}) => {
  const {
    name,
    content,
    passwordProtected,
    passwordHash,
    salt,
    dateUpdated: dateUpdatedString,
  } = todo;

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const openNote = (password) => {
    const plainText = getPlainText(content, password);
    const newTodo = { ...todo };
    newTodo.content = JSON.parse(plainText);
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

  const toggleName = (previousName) => {
    return previousName === name ? "" : name;
  };

  return (
    <View
      style={[
        styles.container,
        selectedTodoName === name ? styles.selectedToDelete : {},
      ]}
    >
      <Pressable
        onPress={onPress}
        onLongPress={() => setSelectedTodoName(toggleName)}
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
