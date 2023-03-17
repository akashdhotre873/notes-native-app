import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Modal, TextInput } from "react-native-paper";
import { useDispatch } from "react-redux";
import { errorMessages, promptCategoryType } from "../../helpers/constants";
import { hidePrompt, showPrompt } from "../../dux/prompt";
import { getHash } from "../../helpers/cryptographyHelper";

export const ConfirmPassword = ({ data: { onAccept, passwordHash, salt } }) => {
  const dispatch = useDispatch();
  const [enteredPassword, setEnteredPassword] = useState("");

  const closeHandler = () => {
    dispatch(hidePrompt());
  };

  const onConfirm = () => {
    closeHandler();
    const hashOfPassword = getHash(enteredPassword, salt);
    if (passwordHash === hashOfPassword) {
      onAccept(enteredPassword);
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
        <Text style={styles.enterPasswordText}>Enter Password</Text>

        <TextInput
          value={enteredPassword}
          onChangeText={setEnteredPassword}
          textContentType="password"
          placeholder="Enter password"
          style={styles.passwordArea}
          autoFocus
          secureTextEntry={true}
        />

        <View style={styles.buttonsContainer}>
          <Button mode="text" onPress={onConfirm}>
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
  enterPasswordText: {
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
