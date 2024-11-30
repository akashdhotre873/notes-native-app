import { StyleSheet, View } from 'react-native';
import { Button, Modal } from 'react-native-paper';
import { useDispatch } from 'react-redux';

import { hidePrompt } from '../../dux/prompt';
import { TextContainer } from '../TextContainer';

export const ExitWithoutSaving = ({ data: { onAccept } }) => {
  const dispatch = useDispatch();

  const closeHandler = () => {
    dispatch(hidePrompt());
  };

  const onConfirm = () => {
    onAccept();
    closeHandler();
  };

  return (
    <Modal
      visible
      contentContainerStyle={styles.modal}
      onDismiss={closeHandler}
      style={{ marginTop: 0 }}
    >
      <View>
        <TextContainer style={styles.header}>Unsaved Note !</TextContainer>

        <TextContainer style={styles.content}>
          You are trying to exit without saving the note! All changes will be
          lost!!!
        </TextContainer>

        <View style={styles.buttonsContainer}>
          <Button mode="text" onPress={onConfirm} textColor="red">
            Confirm
          </Button>
          <Button mode="text" onPress={closeHandler} textColor="blue">
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
  header: {
    paddingTop: 25,
    paddingLeft: 25,
    fontSize: 18,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontWeight: '500',
    color: 'red',
  },
  content: {
    backgroundColor: '#ffffff',
    marginHorizontal: 25,
    marginBottom: 10,
    marginTop: 10,
  },
  buttonsContainer: {
    flexDirection: 'row-reverse',
    marginVertical: 15,
    marginLeft: 20,
  },
});
