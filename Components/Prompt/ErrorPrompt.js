import { StyleSheet, Text, View } from "react-native";
import { Button, Modal } from "react-native-paper";
import { useDispatch } from "react-redux";
import { hidePrompt } from "../../dux/prompt";

export const ErrorPrompt = ({ data: { errorMessage } }) => {
  const dispatch = useDispatch();

  const closeHandler = () => {
    dispatch(hidePrompt());
  };

  return (
    <Modal
      visible
      contentContainerStyle={styles.modal}
      onDismiss={closeHandler}
      style={{ marginTop: 0 }}
    >
      <View>
        <Text>Oops</Text>

        <Text>{errorMessage}</Text>

        <Button mode="text" onPress={closeHandler}>
          Okay
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
