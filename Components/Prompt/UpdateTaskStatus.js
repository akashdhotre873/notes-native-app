import PropTypes from 'prop-types';
import { Pressable, StyleSheet, View } from 'react-native';
import { Modal } from 'react-native-paper';
import { useDispatch } from 'react-redux';

import { hidePrompt } from '../../dux/prompt';
import { getColors } from '../../dux/settings';
import { taskStatus } from '../../helpers/constants';
import { useShallowEqualSelector } from '../../hooks/useShallowEqualSelector';
import { TextContainer } from '../TextContainer';

const { IN_PROGRESS, UNSURE } = taskStatus;

export const UpdateTaskStatus = ({ data: { updateTask, deleteTask } }) => {
  const dispatch = useDispatch();

  const { backgroundColor } = useShallowEqualSelector(getColors);

  const closeHandler = () => {
    dispatch(hidePrompt());
  };

  const changeStatus = (newStatus) => {
    updateTask({ newStatus });
    closeHandler();
  };

  const deleteTaskHandler = () => {
    deleteTask();
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
        <TextContainer style={styles.header}>
          Change Task Status ?
        </TextContainer>

        <TextContainer style={styles.content}>
          Move task to the following status
        </TextContainer>

        <View style={styles.buttonsContainer}>
          <Pressable
            style={[styles.buttonContainer, styles.inProgressButtonContainer]}
            android_ripple={{ color: '#fcf' }}
            onPress={() => changeStatus(IN_PROGRESS)}
          >
            <TextContainer style={[styles.button, styles.inProgressButton]}>
              Work In Progress
            </TextContainer>
          </Pressable>

          <Pressable
            style={[styles.buttonContainer, styles.unsureButtonContainer]}
            android_ripple={{ color: '#fcf' }}
            onPress={() => changeStatus(UNSURE)}
          >
            <TextContainer style={[styles.button, styles.unsureButton]}>
              Mark As Unsure (may not do it)
            </TextContainer>
          </Pressable>

          <Pressable
            style={[styles.buttonContainer, styles.deleteButtonContainer]}
            android_ripple={{ color: '#fcf' }}
            onPress={deleteTaskHandler}
          >
            <TextContainer style={[styles.button, styles.deleteButton]}>
              Delete Task
            </TextContainer>
          </Pressable>

          <Pressable
            style={[styles.buttonContainer, styles.cancelButtonContainer]}
            android_ripple={{ color: '#fcf' }}
            onPress={closeHandler}
          >
            <TextContainer style={[styles.button, styles.cancelButton]}>
              Cancel
            </TextContainer>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

UpdateTaskStatus.propTypes = {
  data: PropTypes.shape({
    updateTask: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired,
  }),
};

const styles = StyleSheet.create({
  modal: {
    top: '-5%',
    width: '80%',
    alignSelf: 'center',
    elevation: 10,
    borderRadius: 4,
  },
  header: {
    paddingTop: 25,
    paddingHorizontal: 25,
    fontSize: 18,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontWeight: '500',
  },
  content: {
    marginHorizontal: 25,
    marginBottom: 10,
    marginTop: 20,
  },
  buttonsContainer: {
    marginVertical: 20,
    marginHorizontal: 20,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    width: '80%',
  },
  button: {
    fontWeight: '700',
    lineHeight: 30,
    paddingVertical: 5,
    width: '100%',
    textAlign: 'center',
  },
  buttonContainer: {
    marginVertical: 5,
    width: '100%',
    borderRadius: 5,
  },
  unsureButtonContainer: {
    backgroundColor: 'orange',
  },
  unsureButton: {
    color: 'black',
  },
  inProgressButtonContainer: {
    backgroundColor: 'green',
  },
  inProgressButton: {
    color: 'white',
  },
  completedButton: {
    color: 'white',
  },
  deleteButtonContainer: {
    backgroundColor: 'red',
  },
  deleteButton: {
    color: '#ffffff',
  },
  cancelButtonContainer: {},
  cancelButton: {},
});
