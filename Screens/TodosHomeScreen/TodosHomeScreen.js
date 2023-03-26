import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";
import { ActionBar } from "../../components/ActionBar";
import { showPrompt } from "../../dux/prompt";
import { promptCategoryType } from "../../helpers/constants";
import { TODO_EDITOR_SCREEN_PATH } from "../../helpers/pagePathHelper";

export const TodosHomeScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const [selectedTodoName, setSelectedTodoName] = useState("");

  const sortAlgo = (todoFirst, todoSecond) => {
    if (todoFirst.name > todoSecond.name) {
      return 1;
    } else if (todoFirst.name < todoSecond.name) {
      return -1;
    }
    return 0;
  };

  const onDelete = () => {
    dispatch(
      showPrompt({
        category: promptCategoryType.DELETE_TODO_PROMPT,
        data: { todoName: selectedTodoName, shouldGoBack: false },
      })
    );
    setSelectedTodoName("");
  };

  return (
    <View>
      <ActionBar
        leftIconSource={require("../../assets/icons/plusButtonIcon.png")}
        leftIconLink={() =>
          navigation.navigate(TODO_EDITOR_SCREEN_PATH, { newTodo: true })
        }
        title="All Todos"
        onDelete={selectedTodoName ? onDelete : null}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cardsContainer: {
    backgroundColor: "#f8f8f3",
    marginTop: 5,
  },
});
