import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Modal, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { errorMessages, promptCategoryType } from "../../helpers/constants";
import { hidePrompt, showPrompt } from "../../dux/prompt";
import { getHash } from "../../helpers/cryptographyHelper";
import { deleteNote, getNoteByName, getNotes } from "../../dux/notes";
import { useNavigation } from "@react-navigation/native";
import { deleteNoteInAsyncStorage } from "../../helpers/notesHelper";

export const DeleteNotePrompt = ({ data: { noteName } }) => {
  const dispatch = useDispatch();
  const notes = useSelector(getNotes);
  const note = useSelector(getNoteByName(noteName));
  const navigation = useNavigation();
  const { passwordProtected, salt, passwordHash } = note;

  const [enteredPassword, setEnteredPassword] = useState("");

  const closeHandler = () => {
    dispatch(hidePrompt());
  };

  const onConfirm = () => {
    closeHandler();
    if (passwordProtected) {
      const hashOfPassword = getHash(enteredPassword, salt);
      if (passwordHash !== hashOfPassword) {
        dispatch(
          showPrompt({
            category: promptCategoryType.ERROR_PROMPT,
            data: { errorMessage: errorMessages.WRONG_PASSWORD },
          })
        );

        return;
      }
    }
    navigation.goBack();
    deleteNoteInAsyncStorage({ notes, noteName });
    dispatch(deleteNote(noteName));
  };

  return (
    <Modal
      visible
      contentContainerStyle={styles.modal}
      onDismiss={closeHandler}
      style={{ marginTop: 0 }}
    >
      <View>
        <Text style={styles.header}>Delete Note ?</Text>
        <Text style={styles.content}>
          Are you sure you want to delte this note ({" "}
          <Text style={styles.noteNameText}>{noteName}</Text> ) ?
        </Text>
        {passwordProtected && (
          <Text style={styles.content}>Enter password to delete note.</Text>
        )}

        {passwordProtected && (
          <TextInput
            value={enteredPassword}
            onChangeText={setEnteredPassword}
            textContentType="password"
            placeholder="Enter password"
            style={styles.passwordArea}
            autoFocus
            secureTextEntry={true}
          />
        )}

        <View style={styles.buttonsContainer}>
          <Button mode="text" onPress={onConfirm} textColor="red">
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
    top: "0%",
    width: "80%",
    alignSelf: "center",
    elevation: 10,
    borderRadius: 4,
  },
  header: {
    paddingTop: 25,
    paddingLeft: 25,
    fontSize: 18,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    fontWeight: "500",
    color: "red",
  },
  content: {
    paddingTop: 15,
    paddingLeft: 25,
    letterSpacing: 0.5,
  },
  noteNameText: {
    color: "red",
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
