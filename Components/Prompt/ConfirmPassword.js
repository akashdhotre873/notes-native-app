import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Button, Modal } from "react-native-paper";
import { useDispatch } from "react-redux";
import { errorMessages, promptCategoryType } from "../../dux/constants";
import { hidePrompt, showPrompt } from "../../dux/prompt";

export const ConfirmPassword = ({ data: { onAccept, password } }) => {
  const dispatch = useDispatch();
  const [enteredPassword, setEnteredPassword] = useState("");

  const closeHandler = () => {
    dispatch(hidePrompt());
  };

  const onConfirm = () => {
    closeHandler();
    if (password === enteredPassword) {
      onAccept(password);
    } else {
      dispatch(
        showPrompt({
          category: promptCategoryType.ERROR_PROMPT,
          data: { errorMessage: errorMessages.WRONG_PASSWORD },
        })
      );
    }
  };

  return (
    <Modal
      visible
      contentContainerStyle={styles.modal}
      onDismiss={closeHandler}
      style={{ marginTop: 0 }}
    >
      <View>
        <Text>Enter Password</Text>

        <TextInput
          value={enteredPassword}
          onChangeText={setEnteredPassword}
          textContentType="password"
        />

        <Button mode="text" onPress={closeHandler}>
          Cancel
        </Button>
        <Button mode="text" onPress={onConfirm}>
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
