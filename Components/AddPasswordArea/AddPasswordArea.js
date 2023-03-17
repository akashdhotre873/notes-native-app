import { StyleSheet, Text, View } from "react-native";
import { Switch } from "react-native-paper";
import { useDispatch } from "react-redux";
import { promptCategoryType } from "../../helpers/constants";
import { showPrompt } from "../../dux/prompt";

export const AddPasswordArea = ({
  saveNote,
  isDisabled,
  passwordProtected,
  setPasswordProtected,
  passwordHash,
  salt,
}) => {
  const dispatch = useDispatch();

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
              setPasswordProtected(switchOn);
            },
            passwordHash,
            salt,
          },
        })
      );
    } else {
      dispatch(
        showPrompt({
          category: promptCategoryType.CREATE_PASSWORD_PROMPT,
          data: {
            onAccept: (password) => {
              addPassword(password);
              setPasswordProtected(switchOn);
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
        value={passwordProtected}
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
