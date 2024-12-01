import { StyleSheet, View } from 'react-native';
import { Button, Modal } from 'react-native-paper';
import { useDispatch } from 'react-redux';

import { hidePrompt } from '../../dux/prompt';
import { getColors } from '../../dux/settings';
import { useShallowEqualSelector } from '../../hooks/useShallowEqualSelector';
import { TextContainer } from '../TextContainer';

export const ExitWithoutSaving = ({ data: { onAccept } }) => {
  const dispatch = useDispatch();

  const { backgroundColor } = useShallowEqualSelector(getColors);

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
      contentContainerStyle={[styles.modal, { backgroundColor }]}
      onDismiss={closeHandler}
      style={{ marginTop: 0 }}
    >
      <View>
        <TextContainer style={styles.header}>Unsaved Content !</TextContainer>

        <TextContainer style={[styles.content, { marginTop: 15 }]}>
          You are trying to exit without saving the content!
        </TextContainer>
        <TextContainer style={[styles.content, { marginBottom: 15 }]}>
          All changes will be lost !!!
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
    marginHorizontal: 25,
  },
  buttonsContainer: {
    flexDirection: 'row-reverse',
    marginVertical: 15,
    marginLeft: 20,
  },
});
