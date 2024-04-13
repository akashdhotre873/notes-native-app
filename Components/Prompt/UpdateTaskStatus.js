import PropTypes from 'prop-types';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Modal } from 'react-native-paper';
import { useDispatch } from 'react-redux';

import { hidePrompt } from '../../dux/prompt';
import { taskStatus } from '../../helpers/constants';

const { IN_PROGRESS, UNSURE } = taskStatus;

export const UpdateTaskStatus = ({ data: { updateTask, deleteTask } }) => {
  const dispatch = useDispatch();

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
      contentContainerStyle={styles.modal}
      onDismiss={closeHandler}
      style={{ marginTop: 0 }}
    >
      <View>
        <Text style={styles.header}>Change Task Status ?</Text>

        <Text style={styles.content}>Move task to the following status</Text>

        <View style={styles.buttonsContainer}>
          <Pressable
            style={[styles.buttonContainer, styles.inProgressButtonContainer]}
            android_ripple={{ color: '#fcf' }}
            onPress={() => changeStatus(IN_PROGRESS)}
          >
            <Text style={[styles.button, styles.inProgressButton]}>
              Work In Progress
            </Text>
          </Pressable>

          <Pressable
            style={[styles.buttonContainer, styles.unsureButtonContainer]}
            android_ripple={{ color: '#fcf' }}
            onPress={() => changeStatus(UNSURE)}
          >
            <Text style={[styles.button, styles.unsureButton]}>
              Mark As Unsure (may not do it)
            </Text>
          </Pressable>

          <Pressable
            style={[styles.buttonContainer, styles.deleteButtonContainer]}
            android_ripple={{ color: '#fcf' }}
            onPress={deleteTaskHandler}
          >
            <Text style={[styles.button, styles.deleteButton]}>
              Delete Task
            </Text>
          </Pressable>

          <Pressable
            style={[styles.buttonContainer, styles.cancelButtonContainer]}
            android_ripple={{ color: '#fcf' }}
            onPress={closeHandler}
          >
            <Text style={[styles.button, styles.cancelButton]}>Cancel</Text>
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
    backgroundColor: '#ffffff',
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
    backgroundColor: '#ffffff',
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
