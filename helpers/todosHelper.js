import { setItemToAsyncStorage } from "./asyncStorageHelper";
import { taskStatus } from "./constants";

export const updateTodoHelper = ({
  todos,
  previousTodoName,
  currentTodoName,
  tasks,
  status,
  passwordProtected,
  passwordHash,
  salt,
  dateUpdated,
}) => {
  const newTodos = { ...todos };
  delete newTodos[previousTodoName];
  newTodos[currentTodoName] = {};
  newTodos[currentTodoName].name = currentTodoName;
  newTodos[currentTodoName].tasks = tasks;
  newTodos[currentTodoName].status = status;
  newTodos[currentTodoName].passwordProtected = passwordProtected;
  newTodos[currentTodoName].passwordHash = passwordHash;
  newTodos[currentTodoName].salt = salt;
  newTodos[currentTodoName].dateUpdated = dateUpdated.toString();
  return newTodos;
};

export const updateTodoInAsyncStorage = ({
  todos,
  previousTodoName,
  currentTodoName,
  tasks,
  status,
  passwordProtected,
  passwordHash,
  salt,
  dateUpdated,
}) => {
  const newTodos = updateTodoHelper({
    todos,
    previousTodoName,
    tasks,
    status,
    currentTodoName,
    passwordProtected,
    passwordHash,
    salt,
    dateUpdated,
  });
  setItemToAsyncStorage("todos", JSON.stringify(newTodos));
};

export const deleteTodoInAsyncStorage = ({ todos, todoName }) => {
  delete todos[todoName];
  setItemToAsyncStorage("todos", JSON.stringify(todos));
};

const getSignForStatus = (status) => {
  switch (status) {
    case taskStatus.COMPLETED:
      return " x ";

    case taskStatus.IN_PROGRESS:
      return " - ";

    case taskStatus.UNSURE:
      return " ? ";

    default:
      return "   ";
  }
};

export const formatTodoToShare = (todo) => {
  const { name, content, status } = todo;
  let formattedText = `TODO\n`;
  formattedText += `name: ${name}\n`;
  formattedText += `Status: ${status}\n\n`;

  formattedText += "Tasks: ";

  if (content.length > 0) {
    formattedText += "\n";
    content.forEach((task) => {
      formattedText += `- [${getSignForStatus(task.status)}] ${task.value}\n`;
    });
  } else {
    formattedText += "No tasks present\n";
  }

  return formattedText;
};
