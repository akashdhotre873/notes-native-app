import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ActionBar } from "../../components/ActionBar";
import { TodoListCard } from "../../components/TodoListCard";
import { showPrompt } from "../../dux/prompt";
import { getTodos } from "../../dux/todos";
import { promptCategoryType } from "../../helpers/constants";
import { TODO_EDITOR_SCREEN_PATH } from "../../helpers/pagePathHelper";
import { useEffect } from "react";
import { getUUID } from "../../helpers/cryptographyHelper";

export const TodosHomeScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const todos = useSelector(getTodos);

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

  useEffect(() => {
    return () => setSelectedTodoName("");
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <ActionBar
        leftIconSource={require("../../assets/icons/plusButtonIcon.png")}
        leftIconLink={() =>
          navigation.navigate(TODO_EDITOR_SCREEN_PATH, { newTodo: true })
        }
        title="All Todos"
        onDelete={selectedTodoName ? onDelete : null}
      />
      <ScrollView style={styles.cardsContainer}>
        {Object.values(todos)
          .sort(sortAlgo)
          .map((todo) => (
            <TodoListCard
              todo={todo}
              key={todo.name + getUUID()}
              selectedTodoName={selectedTodoName}
              setSelectedTodoName={setSelectedTodoName}
            />
          ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  cardsContainer: {
    backgroundColor: "#f8f8f3",
    marginTop: 5,
    flex: 1,
  },
});
