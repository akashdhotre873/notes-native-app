import { StyleSheet, TextInput, View } from "react-native";
import {
  colors,
  promptCategoryType,
  taskStatus,
} from "../../helpers/constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { showPrompt } from "../../dux/prompt";

const { CREATED, IN_PROGRESS, COMPLETED, UNSURE } = taskStatus;

export const TaskEntity = ({ task, setTasksAreSaved, setTasks }) => {
  const dispatch = useDispatch();

  const { status, id, value } = task;

  const updateTasks = (id, newTasks) => {
    setTasksAreSaved(false);
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === id) {
          task.value = newTasks;
        }
        return task;
      })
    );
  };

  const updateTask = ({ newStatus }) => {
    setTasksAreSaved(false);
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === id && task.value) {
          task.status = newStatus;
        }
        return task;
      })
    );
  };

  const deleteTask = () => {
    console.log("delte task");
  };

  const modifyTaskStatus = () => {
    dispatch(
      showPrompt({
        category: promptCategoryType.UPDATE_TASK_STATUS_PROMPT,
        data: { updateTask, deleteTask, task },
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
          color={colors.primaryColor}
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
          style={styles.statusIcon}
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
          size={26}
          color="black"
          onPress={() => updateTask({ newStatus: CREATED })}
          onLongPress={modifyTaskStatus}
        />
      );
    }
    return null;
  };

  const getStyleForTask = () => {
    const styles = {
      COMPLETED: {
        textDecorationLine: "line-through",
      },
    };
    return styles[status] || {};
  };

  return (
    <View style={styles.container}>
      {getTaskStatusIcon()}
      <TextInput
        placeholder="Add todo here"
        style={[styles.tasks, getStyleForTask()]}
        multiline
        value={value}
        onChangeText={(text) => updateTasks(id, text)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
  },
  tasks: {
    paddingTop: 10,
    paddingLeft: 15,
    marginVertical: 10,
    marginRight: 10,
    fontSize: 20,
    marginHorizontal: 5,
    width: "80%",
    lineHeight: 26,
  },
  statusIcon: {
    alignSelf: "center",
    paddingLeft: 10,
    paddingTop: 12,
  },
});
