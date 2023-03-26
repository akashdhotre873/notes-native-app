import { useNavigation, useRoute } from "@react-navigation/native";
import { useRef } from "react";
import { useState } from "react";
import { BackHandler } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getTodos } from "../../dux/todos";
import { promptCategoryType } from "../../helpers/constants";

const { EXIT_WITHOUT_SAVING_PROMPT, DELETE_TODO_PROMPT } = promptCategoryType;

export const TodoEditorScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const todos = useSelector(getTodos);

  const {
    name: header = "",
    content: originalContent = [],
    passwordProtected: hasPassword,
    passwordHash,
    password,
    salt,
    dateUpdated: dateUpdatedString,
    newTodo,
  } = route?.params || {};

  const getUpdatedDate = (dateString) => {
    return Boolean(dateString) ? new Date(dateString) : new Date();
  };

  const [title, setTitle] = useState(header);
  const [content, setContent] = useState(originalContent);
  const [passwordProtected, setPasswordProtected] = useState(hasPassword);
  const [contentIsSaved, setContentIsSaved] = useState(true);
  const [error, setError] = useState({});
  const [dateUpdated, setDateUpdated] = useState(
    getUpdatedDate(dateUpdatedString)
  );
  const contentRef = useRef();
  const previousNoteName = useRef(header);

  const onDelete = () => {
    dispatch(
      showPrompt({
        category: DELETE_TODO_PROMPT,
        data: { todoName: title },
      })
    );
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

  return null;
};
