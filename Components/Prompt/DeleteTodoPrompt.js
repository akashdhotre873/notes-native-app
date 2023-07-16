import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Modal, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { hidePrompt, showPrompt } from "../../dux/prompt";
import { deleteTodo, getTodoByName, getTodos } from "../../dux/todos";
import { errorMessages, promptCategoryType } from "../../helpers/constants";
import { deleteTodoInAsyncStorage } from "../../helpers/todosHelper";
import { getHash } from "../../helpers/cryptographyHelper";

export const DeleteTodoPrompt = ({
  data: { todoName, shouldGoBack = true },
}) => {
  const dispatch = useDispatch();
  const todos = useSelector(getTodos);
  const todo = useSelector(getTodoByName(todoName));
  const navigation = useNavigation();
  const { passwordProtected, salt, passwordHash } = todo;

  const [enteredPassword, setEnteredPassword] = useState("");

  const closeHandler = () => {
    dispatch(hidePrompt());
  };

  const onConfirm = () => {
    closeHandler();
    if (passwordProtected) {
      const hashOfPassword = getHash(enteredPassword, salt);
      if (passwordHash !== hashOfPassword) {
        dispatch(
          showPrompt({
            category: promptCategoryType.ERROR_PROMPT,
            data: { errorMessage: errorMessages.WRONG_PASSWORD },
          })
        );

        return;
      }
    }
    shouldGoBack && navigation.goBack();
    deleteTodoInAsyncStorage({ todos, todoName });
    dispatch(deleteTodo(todoName));
  };

  return (
    <Modal
      visible
      contentContainerStyle={styles.modal}
      onDismiss={closeHandler}
      style={{ marginTop: 0 }}
    >
      <View>
        <Text style={styles.header}>Delete Todo ?</Text>
        <Text style={styles.content}>
          Are you sure you want to delete this todo ({" "}
          <Text style={styles.todoNameText}>{todoName}</Text> ) ?
        </Text>
        {passwordProtected && (
          <Text style={styles.content}>Enter password to delete todo.</Text>
        )}

        {passwordProtected && (
          <TextInput
            value={enteredPassword}
            onChangeText={setEnteredPassword}
            textContentType="password"
            placeholder="Enter password"
            style={styles.passwordArea}
            autoFocus
            secureTextEntry={true}
          />
        )}

        <View style={styles.buttonsContainer}>
          <Button mode="text" onPress={onConfirm} textColor="red">
            Confirm
          </Button>
          <Button mode="text" onPress={closeHandler}>
            Cancel
          </Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "#ffffff",
    top: "0%",
    width: "80%",
    alignSelf: "center",
    elevation: 10,
    borderRadius: 4,
  },
  header: {
    paddingTop: 25,
    paddingLeft: 25,
    fontSize: 18,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    fontWeight: "500",
    color: "red",
  },
  content: {
    paddingTop: 15,
    paddingLeft: 25,
    letterSpacing: 0.5,
  },
  todoNameText: {
    color: "red",
  },
  passwordArea: {
    backgroundColor: "#ffffff",
    marginHorizontal: 20,
    marginBottom: 10,
    marginTop: 10,
  },
  buttonsContainer: {
    flexDirection: "row-reverse",
    marginVertical: 15,
    marginLeft: 20,
  },
});
