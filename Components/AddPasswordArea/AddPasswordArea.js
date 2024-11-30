import { StyleSheet, View } from 'react-native';
import { Switch } from 'react-native-paper';
import { useDispatch } from 'react-redux';

import { showPrompt } from '../../dux/prompt';
import { promptCategoryType } from '../../helpers/constants';
import { TextContainer } from '../TextContainer';

export const AddPasswordArea = ({
  onSave,
  isDisabled,
  passwordProtected,
  setPasswordProtected,
  passwordHash,
  salt,
}) => {
  const dispatch = useDispatch();

  const removePassword = (password, switchOn) => {
    const noteIsSaved = onSave({ hasPassword: false, password });
    if (noteIsSaved) {
      setPasswordProtected(switchOn);
    }
  };

  const addPassword = (password, switchOn) => {
    const noteIsSaved = onSave({ hasPassword: true, password });
    if (noteIsSaved) {
      setPasswordProtected(switchOn);
    }
  };

  const onToggleSwitch = (switchOn) => {
    if (passwordProtected) {
      dispatch(
        showPrompt({
          category: promptCategoryType.CONFIRM_PASSWORD_PROMPT,
          data: {
            onAccept: (param) => removePassword(param, switchOn),
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
            onAccept: (password) => addPassword(password, switchOn),
          },
        })
      );
    }
  };

  return (
    <View style={styles.container}>
      <TextContainer style={styles.text}>Password Protected : </TextContainer>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  text: {
    paddingVertical: 18,
    paddingLeft: 10,
  },
});
