import { MaterialCommunityIcons , Ionicons , EvilIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { StyleSheet, View, Pressable, Text } from 'react-native';
import { useDispatch } from 'react-redux';

import { showPrompt } from '../../dux/prompt';
import { getColors } from '../../dux/settings';
import { getTodos, updateTodo } from '../../dux/todos';
import { promptCategoryType, todoStatus } from '../../helpers/constants';
import { getPlainText } from '../../helpers/cryptographyHelper';
import { TODO_EDITOR_SCREEN_PATH } from '../../helpers/pagePathHelper';
import { runSearchAlgorithm } from '../../helpers/searchHelper';
import { getDateString } from '../../helpers/timeHelper';
import { updateTodoInAsyncStorage } from '../../helpers/todosHelper';
import { useShallowEqualSelector } from '../../hooks/useShallowEqualSelector';
import { TimeDisplayComponent } from '../TimeDisplayComponent';

const { CREATED, IN_PROGRESS, COMPLETED, UNSURE } = todoStatus;

export const TodoListCard = ({
  todo,
  selectedTodoName,
  setSelectedTodoName,
  searchValue,
}) => {
  const {
    name,
    tasks,
    passwordProtected,
    passwordHash,
    salt,
    status,
    dateUpdated: dateUpdatedString,
    dateCreated,
  } = todo;

  const [dateUpdated, setDateUpdated] = useState(new Date(dateUpdatedString));

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const todos = useShallowEqualSelector(getTodos);
  const { primaryColor, lockedColor, unlockedColor } =
    useShallowEqualSelector(getColors);

  const openNote = (password) => {
    const plainText = getPlainText(tasks, password);
    const newTodo = { ...todo };
    newTodo.tasks = plainText;
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

  const getStyleForTodo = () => {
    const styles = {
      COMPLETED: {
        textDecorationLine: 'line-through',
        opacity: 0.6,
      },
    };
    return styles[status] || {};
  };

  const saveTodo = ({ newTodoStatus }) => {
    const status = newTodoStatus;
    const dateUpdatedLocal = new Date();
    setDateUpdated(dateUpdatedLocal);

    dispatch(
      updateTodo({
        previousTodoName: name,
        currentTodoName: name,
        tasks,
        status,
        passwordProtected,
        passwordHash,
        salt,
        dateUpdated: dateUpdatedLocal,
        dateCreated: new Date(dateCreated),
      })
    );
    updateTodoInAsyncStorage({
      todos,
      previousTodoName: name,
      currentTodoName: name,
      tasks,
      status,
      passwordProtected,
      passwordHash,
      salt,
      dateUpdated: dateUpdatedLocal,
      dateCreated: new Date(dateCreated),
    });
  };

  const onDelete = () => {
    dispatch(
      showPrompt({
        category: promptCategoryType.DELETE_TODO_PROMPT,
        data: { todoName: name, shouldGoBack: false },
      })
    );
    setSelectedTodoName('');
  };

  const updateTodoStatus = ({ newTodoStatus }) => {
    if (passwordProtected) {
      return;
    }
    saveTodo({
      newTodoStatus,
    });
  };

  const openUpdateTodoStatusPrompt = () => {
    if (passwordProtected) {
      return;
    }
    dispatch(
      showPrompt({
        category: promptCategoryType.UPDATE_TODO_STATUS_PROMPT,
        data: {
          updateTodo: ({ newTodoStatus }) => saveTodo({ newTodoStatus }),
          deleteTodo: onDelete,
        },
      })
    );
  };

  const getIconForTodo = () => {
    if (status === CREATED) {
      return (
        <MaterialCommunityIcons
          name="checkbox-blank-outline"
          size={22}
          color="black"
          style={styles.statusIcon}
          onPress={() => updateTodoStatus({ newTodoStatus: IN_PROGRESS })}
          onLongPress={openUpdateTodoStatusPrompt}
        />
      );
    }
    if (status === IN_PROGRESS) {
      return (
        <MaterialCommunityIcons
          name="checkbox-intermediate"
          size={22}
          color={primaryColor}
          style={styles.statusIcon}
          onPress={() => updateTodoStatus({ newTodoStatus: COMPLETED })}
          onLongPress={openUpdateTodoStatusPrompt}
        />
      );
    }
    if (status === COMPLETED) {
      return (
        <Ionicons
          name="md-checkbox"
          size={22}
          style={[styles.statusIcon, styles.completedStatusIcon]}
          color="black"
          onPress={() => updateTodoStatus({ newTodoStatus: CREATED })}
          onLongPress={openUpdateTodoStatusPrompt}
        />
      );
    }
    if (status === UNSURE) {
      return (
        <EvilIcons
          style={styles.statusIcon}
          name="question"
          size={22}
          color="black"
          onPress={() => updateTodoStatus({ newTodoStatus: CREATED })}
          onLongPress={openUpdateTodoStatusPrompt}
        />
      );
    }

    return (
      <MaterialCommunityIcons
        name="checkbox-blank-outline"
        size={22}
        color="black"
        style={styles.statusIcon}
        onPress={() => updateTodoStatus({ newTodoStatus: IN_PROGRESS })}
        onLongPress={openUpdateTodoStatusPrompt}
      />
    );
  };

  const toggleName = (previousName) => {
    return previousName === name ? '' : name;
  };

  const { matches: searchValueMatches, matchedIndices } = runSearchAlgorithm({
    pattern: searchValue,
    text: name,
  });

  if (!searchValueMatches) {
    return null;
  }

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        selectedTodoName === name ? styles.selectedToDelete : {},
      ]}
      onLongPress={() => setSelectedTodoName(toggleName)}
    >
      <View
        style={
          passwordProtected
            ? [styles.lockedStyles, { backgroundColor: lockedColor }]
            : [styles.notLockedStyles, { backgroundColor: unlockedColor }]
        }
      />

      {passwordProtected && (
        <Ionicons
          name="lock-closed-sharp"
          size={10}
          color={lockedColor}
          style={styles.lockIcon}
        />
      )}

      <View style={styles.innerContainer}>
        <View style={styles.nameContainer}>
          {getIconForTodo()}
          {searchValueMatches && searchValue !== '' ? (
            <Text style={[styles.name, getStyleForTodo()]}>
              {[...name].map((nameChar, index) => {
                const shouldHighLight = matchedIndices.includes(index);
                return (
                  <View
                    key={nameChar + index}
                    style={shouldHighLight ? {} : { opacity: 0.8 }}
                  >
                    <Text
                      style={[
                        styles.nameChar,
                        getStyleForTodo(),
                        shouldHighLight ? styles.hightLightChar : {},
                      ]}
                    >
                      {nameChar}
                    </Text>
                  </View>
                );
              })}
            </Text>
          ) : (
            <Text style={[styles.name, getStyleForTodo()]}>{name}</Text>
          )}
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.lastModifiedText}>Last Modified :</Text>
          <Text style={styles.dateModifiedText}>
            <TimeDisplayComponent date={dateUpdated} />
          </Text>
          <Text style={styles.dateModifiedText}>
            {getDateString(dateUpdated)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 4,
    backgroundColor: 'white',
    borderRadius: 7,
    elevation: 5,
    flexDirection: 'row',
  },
  lockedStyles: {
    width: 7,
    borderBottomLeftRadius: 7,
    borderTopLeftRadius: 7,
    position: 'relative',
  },
  notLockedStyles: {
    width: 7,
    borderBottomLeftRadius: 7,
    borderTopLeftRadius: 7,
  },
  selectedToDelete: {
    backgroundColor: '#f0ad4e',
  },
  innerContainer: {
    paddingVertical: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexGrow: 1,
  },
  todoTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '65%',
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '60%',
  },
  name: {
    fontSize: 22,
    paddingLeft: 10,
  },
  timeContainer: {
    paddingRight: 15,
    paddingLeft: 3,
  },
  dateModifiedText: {
    marginLeft: 'auto',
    opacity: 0.5,
    fontSize: 10,
  },
  lastModifiedText: {
    marginLeft: 'auto',
    opacity: 0.9,
    fontSize: 10,
  },
  statusIcon: {
    paddingLeft: 10,
    alignSelf: 'center',
  },
  completedStatusIcon: {
    opacity: 0.6,
  },
  nameChar: {
    fontSize: 22,
  },
  hightLightChar: {
    fontWeight: 'bold',
    fontSize: 23,
  },
  lockIcon: {
    position: 'absolute',
    top: 5,
    left: 10,
  },
});
