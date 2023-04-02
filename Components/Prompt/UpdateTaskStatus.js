import { Pressable, StyleSheet, Text, View } from "react-native";
import { Modal } from "react-native-paper";
import { useDispatch } from "react-redux";
import { hidePrompt } from "../../dux/prompt";
import { colors } from "../../helpers/constants";

export const UpdateTaskStatus = ({ task, updateTask, deleteTask }) => {
  const dispatch = useDispatch();

  const closeHandler = () => {
    dispatch(hidePrompt());
  };

  const onConfirm = () => {
    console.log("hello");
  };

  return (
    <Modal
      visible={true}
      contentContainerStyle={styles.modal}
      onDismiss={closeHandler}
      style={{ marginTop: 0 }}
    >
      <View>
        <Text style={styles.header}>Change Task Status ?</Text>

        <Text style={styles.content}>
          Move task status to the following status
        </Text>

        <View style={styles.buttonsContainer}>
          <Pressable
            style={[styles.buttonContainer, styles.completedButtonContainer]}
            onPress={closeHandler}
          >
            <Text style={[styles.button, styles.completedButton]}>
              Completed
            </Text>
          </Pressable>

          <Pressable
            style={[styles.buttonContainer, styles.unsureButtonContainer]}
            android_ripple={{ color: "#fcf" }}
            // onPress={closeHandler}
          >
            <Text style={[styles.button, styles.unsureButton]}>
              Mark As Unsure (may not do it)
            </Text>
          </Pressable>

          <Pressable
            style={[styles.buttonContainer, styles.createdButtonContainer]}
            android_ripple={{ color: "#fcf" }}
            // onPress={closeHandler}
          >
            <Text style={[styles.button, styles.createdButton]}>
              Back To Created
            </Text>
          </Pressable>

          <Pressable
            style={[styles.buttonContainer, styles.inProgressButtonContainer]}
            onPress={closeHandler}
          >
            <Text style={[styles.button, styles.inProgressButton]}>
              Work In Progress
            </Text>
          </Pressable>

          <Pressable
            style={[styles.buttonContainer, styles.deleteButtonContainer]}
            onPress={closeHandler}
          >
            <Text style={[styles.button, styles.deleteButton]}>
              Delete Task
            </Text>
          </Pressable>

          <Pressable
            style={[styles.buttonContainer, styles.cancelButtonContainer]}
            onPress={closeHandler}
          >
            <Text style={[styles.button, styles.cancelButton]}>Cancel</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "#ffffff",
    top: "-5%",
    width: "80%",
    alignSelf: "center",
    elevation: 10,
    borderRadius: 4,
  },
  header: {
    paddingTop: 25,
    paddingHorizontal: 25,
    fontSize: 18,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    fontWeight: "500",
  },
  content: {
    backgroundColor: "#ffffff",
    marginHorizontal: 25,
    marginBottom: 10,
    marginTop: 20,
  },
  buttonsContainer: {
    marginVertical: 20,
    marginHorizontal: 20,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    width: "80%",
  },
  button: {
    fontWeight: "700",
    lineHeight: 30,
    paddingVertical: 5,
    width: "100%",
    textAlign: "center",
  },
  buttonContainer: {
    marginVertical: 5,
    width: "100%",
    borderRadius: 5,
  },
  unsureButtonContainer: {
    backgroundColor: "orange",
  },
  unsureButton: {
    color: "white",
  },
  createdButtonContainer: {
    backgroundColor: "yellow",
  },
  createdButton: {
    color: "black",
  },
  inProgressButtonContainer: {
    backgroundColor: "green",
  },
  inProgressButton: {
    color: "white",
  },
  completedButtonContainer: {
    backgroundColor: colors.primaryColor,
  },
  completedButton: {
    color: "white",
  },
  deleteButtonContainer: {
    backgroundColor: "red",
  },
  deleteButton: {
    color: "#ffffff",
  },
  cancelButtonContainer: {},
  cancelButton: {},
});
