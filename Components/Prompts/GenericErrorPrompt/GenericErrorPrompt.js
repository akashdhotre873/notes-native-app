import { StyleSheet, Text, View } from "react-native";
import { Modal } from "react-native-paper";
import { useDispatch } from "react-redux";

export const GenericErrorPrompt = () => {
  const dispatch = useDispatch();

  const closeHandler = () => {};

  return (
    <Modal
      visible={true}
      onDismiss={closeHandler}
      style={{ marginTop: 0 }}
      contentContainerStyle={styles.contentContainerStyle}
    >
      <View>
        <View style={styles.titleContainer}></View>
        <Text>Error</Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    backgroundColor: "ffffff",
    top: "-10%",
    width: "80%",
    alignSelf: "center",
    elevation: 10,
    borderRadius: 5,
  },
});
