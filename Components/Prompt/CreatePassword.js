import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Button, Modal } from "react-native-paper";
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
      visible
      contentContainerStyle={styles.modal}
      onDismiss={closeHandler}
      style={{ marginTop: 0 }}
    >
      <View>
        <Text>Create Password</Text>

        <TextInput
          value={enteredPassword}
          onChangeText={setEnteredPassword}
          textContentType="password"
        />

        <Button mode="text" onPress={closeHandler}>
          Cancel
        </Button>
        <Button
          mode="text"
          onPress={onConfirm}
          disabled={enteredPassword.length < 1}
        >
          Confirm
        </Button>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "ffffff",
    top: "-10%",
    width: "80%",
    alignSelf: "center",
    elevation: 10,
    borderRadius: 4,
  },
});
