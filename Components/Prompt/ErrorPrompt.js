import { StyleSheet, TextContainer, View } from 'react-native';
import { Button, Modal } from 'react-native-paper';
import { useDispatch } from 'react-redux';

import { hidePrompt } from '../../dux/prompt';

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
        <TextContainer style={styles.oopsMessage}>Oops</TextContainer>

        <TextContainer style={styles.errorMessage}>
          {errorMessage}
        </TextContainer>

        <Button mode="text" onPress={closeHandler} style={styles.button}>
          Okay
        </Button>
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
  oopsMessage: {
    paddingTop: 25,
    paddingLeft: 25,
    fontSize: 18,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontWeight: '500',
    color: 'red',
  },
  errorMessage: {
    backgroundColor: '#ffffff',
    marginHorizontal: 25,
    marginBottom: 10,
    marginTop: 10,
    fontSize: 14,
    letterSpacing: 0.2,
  },
  button: {
    marginRight: 15,
    marginBottom: 15,
    alignSelf: 'flex-end',
  },
});
