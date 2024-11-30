import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { BackHandler, ScrollView, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { ActionBar } from '../../components/ActionBar';
import { NewContent } from '../../components/NewContent';
import { NoteListCard } from '../../components/NoteListCard';
import { getNotes } from '../../dux/notes';
import { showPrompt } from '../../dux/prompt';
import { getColors } from '../../dux/settings';
import { getSortInfoFor } from '../../dux/sort';
import { dataType, promptCategoryType } from '../../helpers/constants';
import { NOTE_EDITOR_SCREEN_PATH } from '../../helpers/pagePathHelper';
import { sortNotes } from '../../helpers/sortHelper';
import { useShallowEqualSelector } from '../../hooks/useShallowEqualSelector';

export const NotesHomeScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const notes = useShallowEqualSelector(getNotes);
  const { selectedSortParameter, selectedSortOrder } = useShallowEqualSelector(
    getSortInfoFor(dataType.NOTE)
  );
  const { backgroundColor } = useShallowEqualSelector(getColors);
  const [searchValue, setSearchValue] = useState('');
  const [selectedNoteName, setSelectedNoteName] = useState('');

  const sortAlgo = (noteFirst, noteSecond) => {
    return sortNotes(
      noteFirst,
      noteSecond,
      selectedSortParameter,
      selectedSortOrder
    );
  };

  const onDelete = () => {
    dispatch(
      showPrompt({
        category: promptCategoryType.DELETE_NOTE_PROMPT,
        data: { noteName: selectedNoteName, shouldGoBack: false },
      })
    );
    setSelectedNoteName('');
  };

  useEffect(() => {
    return () => setSelectedNoteName('');
  }, [isFocused]);

  const backAction = useCallback(() => {
    if (!selectedNoteName) {
      const canExit = false;
      return canExit;
    }
    setSelectedNoteName('');
    const canNotExit = true;
    return canNotExit;
  }, [selectedNoteName]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [selectedNoteName, backAction]);

  const onSearchValueChange = (newValue) => {
    setSearchValue(newValue);
    setSelectedNoteName('');
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <ActionBar
        title="All Notes"
        onDelete={selectedNoteName ? onDelete : null}
        sortItem={dataType.NOTE}
        searchValue={searchValue}
        onSearchValueChange={onSearchValueChange}
      />

      <ScrollView
        style={styles.cardsContainer}
        keyboardShouldPersistTaps="handled"
      >
        {Object.values(notes)
          .sort(sortAlgo)
          .map((note) => (
            <NoteListCard
              key={note.name}
              note={note}
              setSelectedNoteName={setSelectedNoteName}
              selectedNoteName={selectedNoteName}
              searchValue={searchValue}
            />
          ))}
      </ScrollView>

      <NewContent
        iconOnClick={() =>
          navigation.navigate(NOTE_EDITOR_SCREEN_PATH, { newNote: true })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardsContainer: {
    marginTop: 5,
    flex: 1,
  },
});
