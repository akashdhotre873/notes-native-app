import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ActionBar } from "../../components/ActionBar";
import { NoteListCard } from "../../components/NoteListCard";
import { getNotes } from "../../dux/notes";
import { showPrompt } from "../../dux/prompt";
import { promptCategoryType } from "../../helpers/constants";
import { NOTE_EDITOR_SCREEN_PATH } from "../../helpers/pagePathHelper";

export const NotesHomeScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const notes = useSelector(getNotes);

  const [selectedNoteName, setSelectedNoteName] = useState("");

  const sortAlgo = (noteFirst, noteSecond) => {
    if (noteFirst.name > noteSecond.name) {
      return 1;
    } else if (noteFirst.name < noteSecond.name) {
      return -1;
    }
    return 0;
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

  return (
    <View>
      <ActionBar
        leftIconSource={require("../../assets/icons/plusButtonIcon.png")}
        leftIconLink={() =>
          navigation.navigate(NOTE_EDITOR_SCREEN_PATH, { newNote: true })
        }
        title="All Notes"
        onDelete={selectedNoteName ? onDelete : null}
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
  cardsContainer: {
    backgroundColor: "#f8f8f3",
    marginTop: 5,
  },
});
