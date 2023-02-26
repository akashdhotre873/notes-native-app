import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Modal, TextInput } from "react-native-paper";
import { useDispatch } from "react-redux";
import { hidePrompt } from "../../dux/prompt";

export const CreatePassword = ({ data: { onAccept } }) => {
  const dispatch = useDispatch();
  const [enteredPassword, setEnteredPassword] = useState("");

  const closeHandler = () => {
    dispatch(hidePrompt());
  };

  const onConfirm = () => {
    onAccept(enteredPassword);
    closeHandler();
  };

  return (
    <Modal
      visible={true}
      contentContainerStyle={styles.modal}
      onDismiss={closeHandler}
      style={{ marginTop: 0 }}
    >
      <View>
        <Text style={styles.createPasswordText}>Create Password</Text>

        <TextInput
          style={styles.passwordArea}
          value={enteredPassword}
          placeholder="Enter password"
          onChangeText={setEnteredPassword}
          textContentType="password"
          autoFocus
        />

        <View style={styles.buttonsContainer}>
          <Button
            mode="text"
            onPress={onConfirm}
            disabled={enteredPassword.length < 1}
          >
            Confirm
          </Button>
          <Button mode="text" onPress={closeHandler}>
            Cancel
          </Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "#ffffff",
    top: "-10%",
    width: "80%",
    alignSelf: "center",
    elevation: 10,
    borderRadius: 4,
  },
  createPasswordText: {
    paddingTop: 25,
    paddingLeft: 25,
    fontSize: 18,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    fontWeight: "500",
  },
  passwordArea: {
    backgroundColor: "#ffffff",

    marginHorizontal: 20,
    marginBottom: 10,
    marginTop: 10,
  },
  buttonsContainer: {
    flexDirection: "row-reverse",
    marginVertical: 15,
    marginLeft: 20,
  },
});
