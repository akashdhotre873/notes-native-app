import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Modal } from 'react-native-paper';
import { useDispatch } from 'react-redux';

import { deleteNote, getNoteByName, getNotes } from '../../dux/notes';
import { hidePrompt, showPrompt } from '../../dux/prompt';
import { getColors } from '../../dux/settings';
import { errorMessages, promptCategoryType } from '../../helpers/constants';
import { getHash } from '../../helpers/cryptographyHelper';
import { deleteNoteInAsyncStorage } from '../../helpers/notesHelper';
import { useShallowEqualSelector } from '../../hooks/useShallowEqualSelector';
import { TextContainer } from '../TextContainer';
import { TextInputContainer } from '../TextInputContainer';

export const DeleteNotePrompt = ({
  data: { noteName, shouldGoBack = true },
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const notes = useShallowEqualSelector(getNotes);
  const note = useShallowEqualSelector(getNoteByName(noteName));
  const { backgroundColor, iconPrimaryColor } =
    useShallowEqualSelector(getColors);

  const { passwordProtected, salt, passwordHash } = note;

  const [enteredPassword, setEnteredPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const closeHandler = () => {
    dispatch(hidePrompt());
  };

  const onConfirm = () => {
    closeHandler();
    if (passwordProtected) {
      const hashOfPassword = getHash(enteredPassword, salt);
      if (passwordHash !== hashOfPassword) {
        dispatch(
          showPrompt({
            category: promptCategoryType.ERROR_PROMPT,
            data: { errorMessage: errorMessages.WRONG_PASSWORD },
          })
        );

        return;
      }
    }
    shouldGoBack && navigation.goBack();
    deleteNoteInAsyncStorage({ notes, noteName });
    dispatch(deleteNote(noteName));
  };

  return (
    <Modal
      visible
      contentContainerStyle={[styles.modal, { backgroundColor }]}
      onDismiss={closeHandler}
      style={{ marginTop: 0 }}
    >
      <View>
        <TextContainer style={styles.header}>Delete Note ?</TextContainer>
        <TextContainer style={styles.content}>
          Are you sure you want to delete this note ({' '}
          <TextContainer style={styles.noteNameText}>{noteName}</TextContainer>{' '}
          ) ?
        </TextContainer>
        {passwordProtected && (
          <TextContainer style={styles.content}>
            Enter password to delete note.
          </TextContainer>
        )}

        {passwordProtected && (
          <View style={styles.passwordAreaContainer}>
            <TextInputContainer
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
                color={iconPrimaryColor}
              />
            ) : (
              <Ionicons
                onPress={() => setShowPassword(!showPassword)}
                name="eye"
                size={20}
                color={iconPrimaryColor}
              />
            )}
          </View>
        )}

        <View style={styles.buttonsContainer}>
          <Button mode="text" onPress={onConfirm} textColor="red">
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
    top: '0%',
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
    paddingTop: 15,
    paddingLeft: 25,
    letterSpacing: 0.5,
  },
  noteNameText: {
    color: 'red',
  },
  passwordArea: {
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
