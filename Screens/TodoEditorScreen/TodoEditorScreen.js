import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useRef } from "react";
import { useState } from "react";
import {
  BackHandler,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  TextInput,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ActionBar } from "../../components/ActionBar";
import { AddPasswordArea } from "../../components/AddPasswordArea/AddPasswordArea";
import { showPrompt } from "../../dux/prompt";
import { getTodos, updateTodo } from "../../dux/todos";
import { promptCategoryType, todoStatus } from "../../helpers/constants";
import { getDateString, getTimeString } from "../../helpers/timeHelper";
import { updateTodoInAsyncStorage } from "../../helpers/todosHelper";

const { EXIT_WITHOUT_SAVING_PROMPT, DELETE_TODO_PROMPT } = promptCategoryType;

export const TodoEditorScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const todos = useSelector(getTodos);

  const {
    name: header = "",
    content: originalContentStringified = "[]",
    passwordProtected: hasPassword,
    passwordHash,
    password,
    salt,
    dateUpdated: dateUpdatedString,
    newTodo: isNewTodo,
  } = route?.params || {};

  const getUpdatedDate = (dateString) => {
    return Boolean(dateString) ? new Date(dateString) : new Date();
  };
  const originalContent = JSON.parse(originalContentStringified);
  const [title, setTitle] = useState(header);
  const [content, setContent] = useState(originalContent);
  const index = useRef(content.length);
  const [passwordProtected, setPasswordProtected] = useState(hasPassword);
  const [contentIsSaved, setContentIsSaved] = useState(true);
  const [error, setError] = useState({});
  const [newTodo, setNewTodo] = useState(isNewTodo);
  const [dateUpdated, setDateUpdated] = useState(
    getUpdatedDate(dateUpdatedString)
  );
  const contentRef = useRef();
  const previousTodoName = useRef(header);

  const checkIfTitleExists = () => {
    const sameTitleExists = Object.keys(todos).some(
      (currentheader) =>
        currentheader.trim() === title?.trim() && currentheader !== header
    );
    if (sameTitleExists) {
      setError({
        hasError: true,
        errorMessage: "Another todo with same name exists",
      });
    } else {
      setError({});
    }

    return sameTitleExists;
  };

  const saveTodo = ({ hasPassword, password }) => {
    setContentIsSaved(true);
    setNewTodo(false);
    let contentToSave = JSON.stringify(content);
    let salt;
    let updatedHashOfPassword;
    if (hasPassword) {
      contentToSave = getCipherText(content, password);
      salt = getUUID();
      updatedHashOfPassword = getHash(password, salt);
    }

    const dateUpdatedLocal = new Date();
    setDateUpdated(dateUpdatedLocal);

    dispatch(
      updateTodo({
        previousTodoName: previousTodoName.current,
        currentTodoName: title.trim(),
        content: contentToSave,
        passwordProtected: hasPassword,
        passwordHash: updatedHashOfPassword,
        salt,
        dateUpdated: dateUpdatedLocal,
      })
    );
    updateTodoInAsyncStorage({
      todos: todos,
      previousTodoName: previousTodoName.current,
      currentTodoName: title.trim(),
      content: contentToSave,
      passwordProtected: hasPassword,
      passwordHash: updatedHashOfPassword,
      salt,
      dateUpdated: dateUpdatedLocal,
    });

    previousTodoName.current = title;
  };

  const checkAndSaveTodo = ({ password, hasPassword }) => {
    if (checkIfTitleExists()) {
      return;
    } else {
      saveTodo({ hasPassword, password });
    }
  };

  const getActionBarProps = () => {
    if (!title?.trim() || contentIsSaved)
      return {
        rightIconLink: () => {},
        rightIconSource: require("../../assets/icons/saveInactiveButtonIcon.png"),
      };

    return {
      rightIconLink: () =>
        checkAndSaveTodo({ hasPassword: passwordProtected, password }),
      rightIconSource: require("../../assets/icons/saveActiveButtonIcon.png"),
    };
  };

  const changeTitle = (newTitle) => {
    setContentIsSaved(false);
    setTitle(newTitle);
  };

  const changeContent = (index, newContent) => {
    setContentIsSaved(false);
    setContent((prevContent) =>
      prevContent.map((eachTodo) => {
        if (eachTodo.index === index) {
          eachTodo.value = newContent;
        }
        return eachTodo;
      })
    );
  };

  const onDelete = () => {
    dispatch(
      showPrompt({
        category: DELETE_TODO_PROMPT,
        data: { todoName: title },
      })
    );
  };

  const goBack = () => {
    if (contentIsSaved) {
      navigation.goBack();
      return;
    }
    dispatch(
      showPrompt({
        category: EXIT_WITHOUT_SAVING_PROMPT,
        data: { onAccept: () => navigation.goBack() },
      })
    );
  };

  const addNewTodo = () => {
    setContent((prevContent) => [
      ...prevContent,
      {
        index: index.current,
        value: "",
        status: todoStatus.CREATED,
        dueDate: new Date(),
      },
    ]);
    index.current = index.current + 1;
  };

  const backAction = () => {
    if (contentIsSaved) {
      return false;
    }
    dispatch(
      showPrompt({
        category: EXIT_WITHOUT_SAVING_PROMPT,
        data: { onAccept: () => navigation.goBack() },
      })
    );
    return true;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [contentIsSaved]);

  return (
    <Pressable style={styles.container}>
      <ScrollView style={styles.container} keyboardShouldPersistTaps="always">
        <TouchableWithoutFeedback>
          <View>
            <ActionBar
              title={newTodo ? "Creating Todo" : "Editing Todo"}
              leftIconSource={require("../../assets/icons/backButtonIcon.png")}
              leftIconLink={goBack}
              {...getActionBarProps()}
              onDelete={!newTodo && onDelete}
            />
            {error.hasError && (
              <View style={styles.errorMessageContainer}>
                <Text style={styles.errorMessage}>({error.errorMessage})</Text>
              </View>
            )}
            <AddPasswordArea
              onSave={checkAndSaveTodo}
              isDisabled={!title?.trim()}
              passwordProtected={passwordProtected}
              setPasswordProtected={setPasswordProtected}
              passwordHash={passwordHash}
              salt={salt}
            />

            <View style={styles.titleContainer}>
              <TextInput
                placeholder="Title"
                style={styles.title}
                value={title}
                onChangeText={changeTitle}
                autoFocus={!title}
              />
              <Pressable
                onPress={addNewTodo}
                style={styles.addTodoTextContainer}
              >
                <Text style={styles.addTodoText}>+ Add Todo</Text>
              </Pressable>
            </View>
            {dateUpdated && (
              <View style={styles.timeContainer}>
                <Text style={styles.dateModifiedText}>
                  {getTimeString(dateUpdated)}
                </Text>
                <Text style={styles.dateModifiedText}>
                  {getDateString(dateUpdated)}
                </Text>
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>
        {content.map((eachTodo) => {
          return (
            <TextInput
              key={eachTodo.dueDate.toString()}
              placeholder="Add todo here"
              style={styles.content}
              multiline
              value={eachTodo.value}
              onChangeText={(text) => changeContent(eachTodo.index, text)}
            />
          );
        })}

        <View style={styles.marginBottom} />
      </ScrollView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    paddingTop: 10,
    paddingLeft: 15,
    paddingRight: 10,
    fontSize: 30,
    marginHorizontal: 5,
  },
  content: {
    paddingTop: 10,
    paddingLeft: 15,
    marginVertical: 10,
    paddingRight: 10,
    fontSize: 20,
    marginHorizontal: 5,
  },
  marginBottom: {
    paddingVertical: 10,
  },
  errorMessageContainer: {
    alignSelf: "center",
  },
  errorMessage: {
    color: "red",
    paddingTop: 2,
    fontSize: 12,
  },
  dateModifiedText: {
    marginHorizontal: 5,
    paddingLeft: 15,
    opacity: 0.5,
    fontSize: 11,
    marginTop: 5,
    marginBottom: 10,
  },
  timeContainer: {
    flexDirection: "row",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  addTodoTextContainer: {
    alignSelf: "center",
  },
  addTodoText: {
    paddingRight: 15,
    fontSize: 20,
    marginHorizontal: 5,
  },
});
