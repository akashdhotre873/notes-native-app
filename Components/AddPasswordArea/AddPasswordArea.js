import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Switch } from "react-native-paper";
import { useDispatch } from "react-redux";
import { promptCategoryType } from "../../dux/constants";
import { updateNote } from "../../dux/notes";
import { showPrompt } from "../../dux/prompt";

export const AddPasswordArea = ({
  saveNote,
  isDisabled,
  passwordProtected,
  password,
}) => {
  const dispatch = useDispatch();
  const [isSwitchOn, setIsSwitchOn] = useState(passwordProtected);

  const removePassword = (password) => {
    saveNote({ hasPassword: false, password: password });
  };

  const addPassword = (password) => {
    saveNote({ hasPassword: true, password });
  };

  const onToggleSwitch = (switchOn) => {
    if (passwordProtected) {
      dispatch(
        showPrompt({
          category: promptCategoryType.CONFIRM_PASSWORD_PROMPT,
          data: {
            onAccept: (param) => {
              removePassword(param);
              setIsSwitchOn(switchOn);
            },
            password,
          },
        })
      );
    } else {
      dispatch(
        showPrompt({
          category: promptCategoryType.CREATE_PASSWORD_PROMPT,
          data: {
            onAccept: (param) => {
              addPassword(param);
              setIsSwitchOn(switchOn);
            },
          },
        })
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Password Protected : </Text>
      <Switch
        value={isSwitchOn}
        onValueChange={onToggleSwitch}
        disabled={isDisabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
  text: {
    paddingTop: 18,
    paddingLeft: 10,
  },
});
