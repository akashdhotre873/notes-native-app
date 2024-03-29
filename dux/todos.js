import { updateTodoHelper } from "../helpers/todosHelper";

const SET_TODOS = `[todos] set todos`;
const UPDATE_TODO = `[todos] update todo`;
const DELETE_TODO = `[todos] delete todo`;

export const setTodos = ({ todos }) => ({
  type: SET_TODOS,
  payload: todos,
});

export const deleteTodo = ({ todoName }) => ({
  type: DELETE_TODO,
  payload: { todoName },
});

export const updateTodo = ({
  previousTodoName,
  currentTodoName,
  tasks,
  status,
  passwordProtected,
  passwordHash,
  salt,
  dateUpdated,
  dateCreated,
}) => ({
  type: UPDATE_TODO,
  payload: {
    previousTodoName,
    currentTodoName,
    tasks,
    status,
    passwordProtected,
    passwordHash,
    salt,
    dateUpdated,
    dateCreated,
  },
});

const initialState = {};

const todosReducer = (state = initialState, action) => {
  if (action.type === SET_TODOS) {
    return action.payload;
  }

  if (action.type === UPDATE_TODO) {
    return updateTodoHelper({
      todos: state,
      ...action.payload,
    });
  }

  if (action.type === DELETE_TODO) {
    const { todoName } = action.payload;
    delete state[todoName];
    return { ...state };
  }

  return state;
};

export default todosReducer;

// selectors
export const getTodos = ({ todos }) => todos;

export const getTodoByName =
  (name) =>
  ({ todos }) =>
    todos[name];
