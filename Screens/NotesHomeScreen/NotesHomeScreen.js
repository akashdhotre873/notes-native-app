import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { useState } from "react";
import { BackHandler, ScrollView, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ActionBar } from "../../components/ActionBar";
import { NoteListCard } from "../../components/NoteListCard";
import { getNotes } from "../../dux/notes";
import { showPrompt } from "../../dux/prompt";
import { dataType, promptCategoryType } from "../../helpers/constants";
import { NOTE_EDITOR_SCREEN_PATH } from "../../helpers/pagePathHelper";
import { sortNotes } from "../../helpers/sortHelper";
import { getSortInfoFor } from "../../dux/sort";

export const NotesHomeScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const notes = useSelector(getNotes);
  const { selectedSortParameter, selectedSortOrder } = useSelector(
    getSortInfoFor(dataType.NOTE)
  );

  const [selectedNoteName, setSelectedNoteName] = useState("");

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
    setSelectedNoteName("");
  };

  useEffect(() => {
    return () => setSelectedNoteName("");
  }, [isFocused]);

  const backAction = () => {
    if (!selectedNoteName) {
      const canExit = false;
      return canExit;
    }
    setSelectedNoteName("");
    const canNotExit = true;
    return canNotExit;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [selectedNoteName]);

  return (
    <View style={styles.container}>
      <ActionBar
        leftIconSource={require("../../assets/icons/plusButtonIcon.png")}
        leftIconLink={() =>
          navigation.navigate(NOTE_EDITOR_SCREEN_PATH, { newNote: true })
        }
        title="All Notes"
        onDelete={selectedNoteName ? onDelete : null}
        sortItem={dataType.NOTE}
      />
      <ScrollView style={styles.cardsContainer}>
        {Object.values(notes)
          .sort(sortAlgo)
          .map((note) => (
            <NoteListCard
              note={note}
              key={note.name}
              setSelectedNoteName={setSelectedNoteName}
              selectedNoteName={selectedNoteName}
            />
          ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardsContainer: {
    backgroundColor: "#f8f8f3",
    marginTop: 5,
    flex: 1,
  },
});
