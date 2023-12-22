import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useRef } from 'react';
import { useState } from 'react';
import {
  BackHandler,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  TextInput,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ActionBar } from '../../components/ActionBar';
import { AddPasswordArea } from '../../components/AddPasswordArea/AddPasswordArea';
import { showPrompt } from '../../dux/prompt';
import { getTodos, updateTodo } from '../../dux/todos';
import {
  dataType,
  promptCategoryType,
  taskStatus,
  todoStatus,
} from '../../helpers/constants';
import { getDateString } from '../../helpers/timeHelper';
import { updateTodoInAsyncStorage } from '../../helpers/todosHelper';
import {
  getCipherText,
  getHash,
  getUUID,
} from '../../helpers/cryptographyHelper';
import { TaskEntity } from '../../components/TaskEntity';
import { TimeDisplayComponent } from '../../components/TimeDisplayComponent';
import { Ionicons } from '@expo/vector-icons';

const { EXIT_WITHOUT_SAVING_PROMPT, DELETE_TODO_PROMPT } = promptCategoryType;
const {
  CREATED: TASK_CREATED,
  IN_PROGRESS: TASK_IN_PROGRESS,
  COMPLETED: TASK_COMPLETED,
  UNSURE,
} = taskStatus;
const {
  CREATED: TODO_CREATED,
  COMPLETED: TODO_COMPLETED,
  IN_PROGRESS: TODO_IN_PROGRESS,
} = todoStatus;

export const TodoEditorScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const todos = useSelector(getTodos);

  const {
    name: header = '',
    tasks: originalTasksStringified = '[]',
    passwordProtected: hasPassword,
    passwordHash: passwordHashOld,
    password: passwordOld,
    salt: saltOld,
    dateUpdated: dateUpdatedString,
    dateCreated = new Date(),
    newTodo: isNewTodo = false,
    status = todoStatus.CREATED,
  } = route?.params || {};

  const getUpdatedDate = (dateString) => {
    return Boolean(dateString) ? new Date(dateString) : new Date();
  };
  const originalTasks = JSON.parse(originalTasksStringified).map((task) => {
    task.dateCreated = getUpdatedDate(task.dateCreated);
    task.dateUpdated = getUpdatedDate(task.dateUpdated);
    task.dueDate = getUpdatedDate(task.dueDate);
    return task;
  });
  const [title, setTitle] = useState(header);
  const [tasks, setTasks] = useState(originalTasks);
  const [passwordProtected, setPasswordProtected] = useState(hasPassword);
  const [password, setPassword] = useState(passwordOld);
  const [passwordHash, setPasswordHash] = useState(passwordHashOld);
  const [salt, setSalt] = useState(saltOld);
  const [TasksAreSaved, setTasksAreSaved] = useState(true);
  const [error, setError] = useState({});
  const [newTodo, setNewTodo] = useState(isNewTodo);
  const [dateUpdated, setDateUpdated] = useState(
    getUpdatedDate(dateUpdatedString)
  );
  const [selection, setSelection] = useState({ start: 0 });
  const previousTodoName = useRef(header);
  const autoFocusTaskId = useRef('');
  const contentToShare = {
    dataType: dataType.TODO,
    name: title,
    content: tasks,
    status,
  };

  const checkIfTitleExists = () => {
    const sameTitleExists = Object.keys(todos).some(
      (otherTodoName) =>
        otherTodoName.trim() === title?.trim() &&
        otherTodoName !== previousTodoName.current
    );
    if (sameTitleExists) {
      setError({
        hasError: true,
        errorMessage: 'Another todo with same name exists',
      });
    } else {
      setError({});
    }

    return sameTitleExists;
  };

  const getStatusOfTodo = () => {
    let isTodoComplete = true;
    let isTodoInProgress = false;
    if (tasks.length === 0) return TODO_CREATED;
    for (const task of tasks) {
      if (task.status === TASK_IN_PROGRESS) {
        return TODO_IN_PROGRESS;
      }
      if (task.status !== TASK_COMPLETED) {
        isTodoComplete = false;
      }
      if (task.status !== TASK_CREATED && task.status !== UNSURE) {
        isTodoInProgress = true;
      }
    }

    if (isTodoComplete) {
      return TODO_COMPLETED;
    }
    if (isTodoInProgress) {
      return TODO_IN_PROGRESS;
    }
    return TODO_CREATED;
  };

  const saveTodo = ({ hasPassword, password }) => {
    setTasksAreSaved(true);
    setNewTodo(false);
    setPassword(password);
    const tasksToStringify = tasks.map((task) => {
      task.dateCreated = task.dateCreated.toString();
      task.dateUpdated = task.dateUpdated.toString();
      task.dueDate = task.dueDate.toString();
      return task;
    });
    let tasksToSave = JSON.stringify(tasksToStringify);
    let salt;
    let updatedHashOfPassword;
    if (hasPassword) {
      tasksToSave = getCipherText(tasksToSave, password);
      salt = getUUID();
      updatedHashOfPassword = getHash(password, salt);
      setSalt(salt);
      setPasswordHash(updatedHashOfPassword);
    }

    const status = getStatusOfTodo();
    const dateUpdatedLocal = new Date();
    setDateUpdated(dateUpdatedLocal);

    dispatch(
      updateTodo({
        previousTodoName: previousTodoName.current,
        currentTodoName: title.trim(),
        tasks: tasksToSave,
        status,
        passwordProtected: hasPassword,
        passwordHash: updatedHashOfPassword,
        salt,
        dateUpdated: dateUpdatedLocal,
        dateCreated,
      })
    );
    updateTodoInAsyncStorage({
      todos: todos,
      previousTodoName: previousTodoName.current,
      currentTodoName: title.trim(),
      tasks: tasksToSave,
      status,
      passwordProtected: hasPassword,
      passwordHash: updatedHashOfPassword,
      salt,
      dateUpdated: dateUpdatedLocal,
      dateCreated,
    });

    previousTodoName.current = title;
  };

  const checkAndSaveTodo = ({ password, hasPassword }) => {
    if (checkIfTitleExists()) {
      return false;
    } else {
      saveTodo({ hasPassword, password });
      return true;
    }
  };

  const getActionBarProps = () => {
    if (!title?.trim() || TasksAreSaved)
      return {
        rightIconLink: () => {},
        rightIconSource: require('../../assets/icons/saveInactiveButtonIcon.png'),
      };

    return {
      rightIconLink: () =>
        checkAndSaveTodo({ hasPassword: passwordProtected, password }),
      rightIconSource: require('../../assets/icons/saveActiveButtonIcon.png'),
    };
  };

  const changeTitle = (newTitle) => {
    setTasksAreSaved(false);
    setTitle(newTitle);
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
    if (TasksAreSaved) {
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
    setTasksAreSaved(false);
    const newTaskId = getUUID();
    setTasks((prevTasks) => [
      ...prevTasks,
      {
        id: newTaskId,
        value: '',
        status: todoStatus.CREATED,
        dateUpdated: new Date(),
        dateCreated: new Date(),
        dueDate: new Date(),
      },
    ]);
    autoFocusTaskId.current = newTaskId;
  };

  const backAction = () => {
    if (TasksAreSaved) {
      const canExit = false;
      return canExit;
    }
    dispatch(
      showPrompt({
        category: EXIT_WITHOUT_SAVING_PROMPT,
        data: { onAccept: () => navigation.goBack() },
      })
    );
    const canNotExit = true;
    return canNotExit;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [TasksAreSaved]);

  const getLeftIcon = (stylesForIcon) => (
    <Ionicons
      name="arrow-back"
      size={26}
      color="black"
      style={stylesForIcon}
      onPress={goBack}
    />
  );

  return (
    <Pressable style={styles.container}>
      <TouchableWithoutFeedback>
        <View>
          <ActionBar
            title={newTodo ? 'Creating Todo' : 'Editing Todo'}
            leftIcon={getLeftIcon}
            {...getActionBarProps()}
            onDelete={!newTodo && onDelete}
            contentToShare={!newTodo && contentToShare} // can't share a todo till it's saved
            allowCopyToClicpBoard={true}
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
              selection={selection}
              onFocus={() => setSelection(null)}
            />
            <Pressable onPress={addNewTodo} style={styles.addTodoTextContainer}>
              <Text style={styles.addTodoText}>+ Add Todo</Text>
            </Pressable>
          </View>
          {dateUpdated && (
            <View style={styles.timeContainer}>
              <Text style={styles.dateModifiedText}>
                <TimeDisplayComponent date={dateUpdated} />
              </Text>
              <Text style={styles.dateModifiedText}>
                {getDateString(dateUpdated)}
              </Text>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
      <ScrollView style={styles.container} keyboardShouldPersistTaps="always">
        {tasks.map((task) => {
          return (
            <View
              key={task.dueDate.toString() + task.id}
              style={styles.taskContainer}
            >
              <TaskEntity
                setTasksAreSaved={setTasksAreSaved}
                task={task}
                setTasks={setTasks}
                autoFocusTaskId={autoFocusTaskId.current}
              />
            </View>
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
    width: '60%',
  },
  addTodoTextContainer: {
    alignSelf: 'center',
  },
  marginBottom: {
    paddingVertical: 10,
  },
  errorMessageContainer: {
    alignSelf: 'center',
  },
  errorMessage: {
    color: 'red',
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
    flexDirection: 'row',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  addTodoText: {
    paddingRight: 15,
    fontSize: 20,
    marginHorizontal: 5,
  },
  taskContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
});
