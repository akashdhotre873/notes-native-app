import {
  MaterialCommunityIcons,
  Ionicons,
  EvilIcons,
} from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { showPrompt } from '../../dux/prompt';
import { getColors } from '../../dux/settings';
import { promptCategoryType, taskStatus } from '../../helpers/constants';
import { useShallowEqualSelector } from '../../hooks/useShallowEqualSelector';
import { TextInputContainer } from '../TextInputContainer';

const { CREATED, IN_PROGRESS, COMPLETED } = taskStatus;

export const TaskEntity = ({
  task,
  setTasksAreSaved,
  setTasks,
  autoFocusTaskId,
}) => {
  const dispatch = useDispatch();
  const { iconPrimaryColor } = useShallowEqualSelector(getColors);

  const { status, id, value } = task;

  const updateTasks = (newTaskValue) => {
    setTasksAreSaved(false);
    setTasks((prevTasks) =>
      prevTasks.map((prevTask) => {
        if (prevTask.id === id) {
          prevTask.value = newTaskValue;
          prevTask.dateUpdated = new Date();
        }
        return prevTask;
      })
    );
  };

  const updateTask = ({ newStatus }) => {
    setTasksAreSaved(false);
    setTasks((prevTasks) =>
      prevTasks.map((prevTask) => {
        if (prevTask.id === id) {
          prevTask.status = newStatus;
          prevTask.dateUpdated = new Date();
        }
        return prevTask;
      })
    );
  };

  const deleteTask = () => {
    setTasksAreSaved(false);
    setTasks((prevTasks) => prevTasks.filter((prevTask) => prevTask.id !== id));
  };

  const modifyTaskStatus = () => {
    dispatch(
      showPrompt({
        category: promptCategoryType.UPDATE_TASK_STATUS_PROMPT,
        data: { updateTask, deleteTask },
      })
    );
  };

  const getTaskStatusIcon = () => {
    if (status === CREATED) {
      return (
        <MaterialCommunityIcons
          name="checkbox-blank-outline"
          size={24}
          color={iconPrimaryColor}
          style={styles.statusIcon}
          onPress={() => updateTask({ newStatus: IN_PROGRESS })}
          onLongPress={modifyTaskStatus}
        />
      );
    }
    if (status === IN_PROGRESS) {
      return (
        <MaterialCommunityIcons
          name="checkbox-intermediate"
          size={24}
          color={iconPrimaryColor}
          style={styles.statusIcon}
          onPress={() => updateTask({ newStatus: COMPLETED })}
          onLongPress={modifyTaskStatus}
        />
      );
    }

    if (status === COMPLETED) {
      return (
        <Ionicons
          name="checkbox"
          size={24}
          style={[styles.statusIcon, styles.completedStatusIcon]}
          color={iconPrimaryColor}
          onPress={() => updateTask({ newStatus: CREATED })}
          onLongPress={modifyTaskStatus}
        />
      );
    }

    // if status === UNSURE -> default case

    return (
      <EvilIcons
        style={styles.statusIcon}
        name="question"
        size={24}
        color={iconPrimaryColor}
        onPress={() => updateTask({ newStatus: CREATED })}
        onLongPress={modifyTaskStatus}
      />
    );
  };

  const getStyleForTask = () => {
    const taskStyles = {
      [COMPLETED]: {
        textDecorationLine: 'line-through',
        opacity: 0.6,
      },
    };
    return (
      taskStyles[status] || {
        textDecorationLine: 'none',
      }
    );
  };

  return (
    <View style={styles.container}>
      {getTaskStatusIcon()}
      <TextInputContainer
        autoFocus={id === autoFocusTaskId}
        placeholder="Add todo here"
        style={[styles.tasks, getStyleForTask()]}
        multiline
        value={value}
        onChangeText={(text) => updateTasks(text)}
      />
    </View>
  );
};

TaskEntity.propTypes = {
  task: PropTypes.object.isRequired,
  setTasksAreSaved: PropTypes.func.isRequired,
  setTasks: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
  },
  tasks: {
    paddingTop: 5,
    paddingLeft: 5,
    marginVertical: 5,
    marginRight: 10,
    fontSize: 20,
    marginHorizontal: 5,
    width: '80%',
    lineHeight: 26,
  },
  statusIcon: {
    alignSelf: 'center',
    paddingLeft: 13,
    paddingRight: 5,
    paddingTop: 9,
  },
  completedStatusIcon: {
    opacity: 0.6,
  },
});
