import { useState } from "react";
import { View } from "react-native";
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

  const removePassword = (password) => {
    saveNote({ hasPassword: false, password: password });
  };

  const addPassword = (password) => {
    saveNote({ hasPassword: true, password });
  };

  const onToggleSwitch = () => {
    if (passwordProtected) {
      dispatch(
        showPrompt({
          category: promptCategoryType.CONFIRM_PASSWORD_PROMPT,
          data: { onAccept: removePassword, password },
        })
      );
    } else {
      dispatch(
        showPrompt({
          category: promptCategoryType.CREATE_PASSWORD_PROMPT,
          data: { onAccept: addPassword },
        })
      );
    }
  };

  return (
    <View>
      <Text>Password Protected : </Text>
      <Switch
        value={passwordProtected}
        onValueChange={onToggleSwitch}
        disabled={isDisabled}
      />
    </View>
  );
};
