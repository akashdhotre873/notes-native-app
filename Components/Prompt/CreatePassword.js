import { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Button, Modal } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { hidePrompt } from '../../dux/prompt';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../helpers/constants';

export const CreatePassword = ({ data: { onAccept } }) => {
  const dispatch = useDispatch();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const closeHandler = () => {
    dispatch(hidePrompt());
  };

  const onConfirm = () => {
    onAccept(enteredPassword);
    closeHandler();
  };

  return (
    <Modal
      visible={true}
      contentContainerStyle={styles.modal}
      onDismiss={closeHandler}
      style={{ marginTop: 0 }}
    >
      <View>
        <Text style={styles.createPasswordText}>Create Password</Text>

        <View style={styles.passwordAreaContainer}>
          <TextInput
            style={styles.passwordArea}
            value={enteredPassword}
            placeholder="Enter password"
            onChangeText={setEnteredPassword}
            textContentType="password"
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
          <Button
            mode="text"
            onPress={onConfirm}
            disabled={enteredPassword.length < 1}
          >
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
  createPasswordText: {
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
