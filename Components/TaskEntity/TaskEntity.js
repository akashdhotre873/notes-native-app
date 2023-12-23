import { StyleSheet, TextInput, View } from 'react-native';
import { promptCategoryType, taskStatus } from '../../helpers/constants';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { showPrompt } from '../../dux/prompt';
import PropTypes from 'prop-types';
import { getColors } from '../../dux/settings';

const { CREATED, IN_PROGRESS, COMPLETED, UNSURE } = taskStatus;

export const TaskEntity = ({
  task,
  setTasksAreSaved,
  setTasks,
  autoFocusTaskId,
}) => {
  const dispatch = useDispatch();
  const { primaryColor } = useSelector(getColors);

  const { status, id, value } = task;

  const updateTasks = (newTaskValue) => {
    setTasksAreSaved(false);
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === id) {
          task.value = newTaskValue;
          task.dateUpdated = new Date();
        }
        return task;
      })
    );
  };

  const updateTask = ({ newStatus }) => {
    setTasksAreSaved(false);
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === id) {
          task.status = newStatus;
          task.dateUpdated = new Date();
        }
        return task;
      })
    );
  };

  const deleteTask = () => {
    setTasksAreSaved(false);
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
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
          color="black"
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
          color={primaryColor}
          style={styles.statusIcon}
          onPress={() => updateTask({ newStatus: COMPLETED })}
          onLongPress={modifyTaskStatus}
        />
      );
    }

    if (status === COMPLETED) {
      return (
        <Ionicons
          name="md-checkbox"
          size={24}
          style={[styles.statusIcon, styles.completedStatusIcon]}
          color="black"
          onPress={() => updateTask({ newStatus: CREATED })}
          onLongPress={modifyTaskStatus}
        />
      );
    }
    if (status === UNSURE) {
      return (
        <EvilIcons
          style={styles.statusIcon}
          name="question"
          size={24}
          color="black"
          onPress={() => updateTask({ newStatus: CREATED })}
          onLongPress={modifyTaskStatus}
        />
      );
    }
    return null;
  };

  const getStyleForTask = () => {
    const taskStyles = {
      [COMPLETED]: {
        textDecorationLine: 'line-through',
        opacity: 0.6,
      },
    };
    return taskStyles[status] || {};
  };

  return (
    <View style={styles.container}>
      {getTaskStatusIcon()}
      <TextInput
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
