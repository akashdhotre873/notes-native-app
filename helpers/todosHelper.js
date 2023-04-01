import { setItemToAsyncStorage } from "./asyncStorageHelper";

export const updateTodoHelper = ({
  todos,
  previousTodoName,
  currentTodoName,
  tasks,
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
  passwordProtected,
  passwordHash,
  salt,
  dateUpdated,
}) => {
  const newTodos = updateTodoHelper({
    todos,
    previousTodoName,
    tasks,
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
