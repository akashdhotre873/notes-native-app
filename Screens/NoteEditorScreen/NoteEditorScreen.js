import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  BackHandler,
} from 'react-native';
import { useDispatch } from 'react-redux';

import { ActionBar } from '../../components/ActionBar';
import { AddPasswordArea } from '../../components/AddPasswordArea/AddPasswordArea';
import { TextContainer } from '../../components/TextContainer';
import { TextInputContainer } from '../../components/TextInputContainer';
import { TimeDisplayComponent } from '../../components/TimeDisplayComponent';
import { getNotes, updateNote } from '../../dux/notes';
import { showPrompt } from '../../dux/prompt';
import { getColors } from '../../dux/settings';
import { dataType, promptCategoryType } from '../../helpers/constants';
import {
  getCipherText,
  getHash,
  getUUID,
} from '../../helpers/cryptographyHelper';
import { updateNoteInAsyncStorage } from '../../helpers/notesHelper';
import { getDateString } from '../../helpers/timeHelper';
import { useShallowEqualSelector } from '../../hooks/useShallowEqualSelector';

const { EXIT_WITHOUT_SAVING_PROMPT, DELETE_NOTE_PROMPT } = promptCategoryType;

export const NoteEditorScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const notes = useShallowEqualSelector(getNotes);
  const { iconPrimaryColor, backgroundColor } =
    useShallowEqualSelector(getColors);

  const {
    name: header = '',
    content: originalContent = '',
    passwordProtected: hasPassword,
    passwordHash: passwordHashOld,
    password: passWordOld,
    salt: saltOld,
    dateUpdated: dateUpdatedString,
    dateCreated = new Date(),
    newNote: isNewNote = false,
  } = route?.params || {};

  const getUpdatedDate = (dateString) => {
    return dateString ? new Date(dateString) : new Date();
  };

  const [title, setTitle] = useState(header);
  const [content, setContent] = useState(originalContent);
  const [passwordProtected, setPasswordProtected] = useState(hasPassword);
  const [password, setPassword] = useState(passWordOld);
  const [passwordHash, setPasswordHash] = useState(passwordHashOld);
  const [salt, setSalt] = useState(saltOld);
  const [contentIsSaved, setContentIsSaved] = useState(true);
  const [error, setError] = useState({});
  const [newNote, setNewNote] = useState(isNewNote);
  const [dateUpdated, setDateUpdated] = useState(
    getUpdatedDate(dateUpdatedString)
  );
  const [selection, setSelection] = useState({ start: 0 });
  const contentRef = useRef();
  const previousNoteName = useRef(header);
  const contentToShare = { dataType: dataType.NOTE, name: title, content };

  const checkIfTitleExists = () => {
    const sameTitleExists = Object.keys(notes).some(
      (otherNoteName) =>
        otherNoteName.trim() === title?.trim() &&
        otherNoteName !== previousNoteName.current
    );
    if (sameTitleExists) {
      setError({
        hasError: true,
        errorMessage: 'Another note with same name exists',
      });
    } else {
      setError({});
    }

    return sameTitleExists;
  };

  const saveNote = ({ hasPassword, password }) => {
    setContentIsSaved(true);
    setNewNote(false);
    setPassword(password);
    let contentToSave = content;
    let salt;
    let updatedHashOfPassword;
    if (hasPassword) {
      contentToSave = getCipherText(content, password);
      salt = getUUID();
      updatedHashOfPassword = getHash(password, salt);
      setSalt(salt);
      setPasswordHash(updatedHashOfPassword);
    }

    const dateUpdatedLocal = new Date();
    setDateUpdated(dateUpdatedLocal);

    dispatch(
      updateNote({
        previousNoteName: previousNoteName.current,
        currentNoteName: title.trim(),
        content: contentToSave,
        passwordProtected: hasPassword,
        passwordHash: updatedHashOfPassword,
        salt,
        dateUpdated: dateUpdatedLocal,
        dateCreated,
      })
    );

    updateNoteInAsyncStorage({
      notes,
      previousNoteName: previousNoteName.current,
      currentNoteName: title.trim(),
      content: contentToSave,
      passwordProtected: hasPassword,
      passwordHash: updatedHashOfPassword,
      salt,
      dateUpdated: dateUpdatedLocal,
      dateCreated,
    });

    previousNoteName.current = title;
  };

  const checkAndSaveNote = ({ password, hasPassword }) => {
    if (checkIfTitleExists()) {
      return false;
    } else {
      saveNote({ hasPassword, password });
      return true;
    }
  };

  const getActionBarProps = () => {
    if (!title?.trim() || contentIsSaved)
      return {
        rightIcon: (stylesForIcon) => (
          <MaterialCommunityIcons
            name="content-save"
            size={33}
            color={iconPrimaryColor}
            style={[stylesForIcon, { opacity: 0.5 }]}
            disabled
          />
        ),
      };

    return {
      rightIcon: (stylesForIcon) => (
        <MaterialCommunityIcons
          name="content-save-alert"
          size={33}
          color={iconPrimaryColor}
          style={stylesForIcon}
          onPress={() =>
            checkAndSaveNote({ hasPassword: passwordProtected, password })
          }
        />
      ),
    };
  };

  const changeTitle = (newTitle) => {
    setContentIsSaved(false);
    setTitle(newTitle);
  };

  const changeContent = (newContent) => {
    setContentIsSaved(false);
    setContent(newContent);
  };

  const onPress = () => {
    setSelection({ start: content?.length, end: content?.length });
    contentRef.current?.focus();
  };

  const onDelete = () => {
    dispatch(
      showPrompt({
        category: DELETE_NOTE_PROMPT,
        data: { noteName: previousNoteName.current },
      })
    );
  };

  const goBack = () => {
    if (contentIsSaved) {
      navigation.goBack();
      return;
    }
    dispatch(
      showPrompt({
        category: EXIT_WITHOUT_SAVING_PROMPT,
        data: { onAccept: () => navigation.goBack() },
      })
    );
  };

  const backAction = useCallback(() => {
    if (contentIsSaved) {
      return false; // false -> user will go back from the screen
    }
    dispatch(
      showPrompt({
        category: EXIT_WITHOUT_SAVING_PROMPT,
        data: { onAccept: () => navigation.goBack() },
      })
    );

    return true; // true -> user will stay on the same screen
  }, [dispatch, contentIsSaved, navigation]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [contentIsSaved, backAction]);

  const getLeftIcon = (stylesForIcon) => (
    <Ionicons
      name="arrow-back"
      size={26}
      color={iconPrimaryColor}
      style={stylesForIcon}
      onPress={goBack}
    />
  );

  return (
    <Pressable
      style={[styles.container, { backgroundColor }]}
      onPress={onPress}
    >
      <TouchableWithoutFeedback>
        <View>
          <ActionBar
            title={newNote ? 'Creating note' : 'Editing note'}
            leftIcon={getLeftIcon}
            {...getActionBarProps()}
            onDelete={!newNote && onDelete}
            contentToShare={!newNote && contentToShare} // can't share a note till it's saved
            allowCopyToClicpBoard
          />
          {error.hasError && (
            <View style={styles.errorMessageContainer}>
              <TextContainer style={styles.errorMessage}>
                ({error.errorMessage})
              </TextContainer>
            </View>
          )}
          <AddPasswordArea
            onSave={checkAndSaveNote}
            isDisabled={!title?.trim()}
            passwordProtected={passwordProtected}
            setPasswordProtected={setPasswordProtected}
            passwordHash={passwordHash}
            salt={salt}
          />

          <TextInputContainer
            placeholder="Title"
            style={[styles.title, { backgroundColor }]}
            value={title}
            onChangeText={changeTitle}
            autoFocus={!title}
            selectTextOnFocus
          />
          {dateUpdated && (
            <View style={styles.timeContainer}>
              <TextContainer style={styles.dateModifiedText}>
                <TimeDisplayComponent date={dateUpdated} />
              </TextContainer>
              <TextContainer style={styles.dateModifiedText}>
                {getDateString(dateUpdated)}
              </TextContainer>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
      <ScrollView
        style={[styles.container, { backgroundColor }]}
        keyboardShouldPersistTaps="always"
      >
        <TextInputContainer
          placeholder="Add note here"
          style={styles.content}
          multiline
          editable
          value={content}
          onChangeText={changeContent}
          componentRef={contentRef}
          selection={selection}
          onFocus={() => setSelection(null)}
        />
        <View style={styles.marginBottom} />
      </ScrollView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    paddingTop: 10,
    paddingLeft: 15,
    paddingRight: 10,
    fontSize: 30,
    marginHorizontal: 5,
  },
  content: {
    flex: 1,
    minHeight: 500,
    textAlignVertical: 'top',
    paddingTop: 10,
    paddingLeft: 15,
    paddingRight: 10,
    fontSize: 20,
    marginHorizontal: 5,
  },
  marginBottom: {
    paddingVertical: 10,
  },
  errorMessageContainer: {
    alignSelf: 'center',
  },
  errorMessage: {
    color: 'red',
    paddingTop: 2,
    fontSize: 12,
  },
  dateModifiedText: {
    marginHorizontal: 5,
    paddingLeft: 15,
    opacity: 0.5,
    fontSize: 11,
    marginTop: 5,
    marginBottom: 10,
  },
  timeContainer: {
    flexDirection: 'row',
  },
  rightButtonImage: {
    height: 28,
    width: 28,
    resizeMode: 'contain',
    marginRight: 15,
    alignSelf: 'center',
  },
});
