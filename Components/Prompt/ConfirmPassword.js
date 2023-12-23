import { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Button, Modal } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import {
  colors,
  errorMessages,
  promptCategoryType,
} from '../../helpers/constants';
import { hidePrompt, showPrompt } from '../../dux/prompt';
import { getHash } from '../../helpers/cryptographyHelper';
import { Ionicons } from '@expo/vector-icons';

export const ConfirmPassword = ({ data: { onAccept, passwordHash, salt } }) => {
  const dispatch = useDispatch();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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

        <View style={styles.passwordAreaContainer}>
          <TextInput
            value={enteredPassword}
            onChangeText={setEnteredPassword}
            textContentType="password"
            placeholder="Enter password"
            style={styles.passwordArea}
            autoFocus
            secureTextEntry={!showPassword}
          />
          {showPassword ? (
            <Ionicons
              onPress={() => setShowPassword(!showPassword)}
              name="eye-off"
              size={20}
              color="black"
            />
          ) : (
            <Ionicons
              onPress={() => setShowPassword(!showPassword)}
              name="eye"
              size={20}
              color="black"
            />
          )}
        </View>

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
    backgroundColor: '#ffffff',
    top: '-10%',
    width: '80%',
    alignSelf: 'center',
    elevation: 10,
    borderRadius: 4,
  },
  enterPasswordText: {
    paddingTop: 25,
    paddingLeft: 25,
    fontSize: 18,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontWeight: '500',
  },
  passwordArea: {
    backgroundColor: '#ffffff',
    marginBottom: 10,
    marginTop: 10,
    paddingTop: 10,
    fontSize: 20,
  },
  buttonsContainer: {
    flexDirection: 'row-reverse',
    marginVertical: 15,
    marginLeft: 20,
  },
  passwordAreaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 30,
    marginLeft: 25,
    borderBottomWidth: 2,
    borderBottomColor: '#006efe',
  },
});
