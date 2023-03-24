import { ScrollView, StyleSheet, View } from "react-native";
import { ActionBar } from "../../components/ActionBar";
import { useNavigation } from "@react-navigation/native";
import { NOTE_EDITOR_SCREEN_PATH } from "../../helpers/pagePathHelper";
import { useDispatch, useSelector } from "react-redux";
import { getNotes } from "../../dux/notes";
import { NoteListCard } from "../../components/NoteListCard";
import { useState } from "react";
import { promptCategoryType } from "../../helpers/constants";
import { showPrompt } from "../../dux/prompt";

export const HomeScreen = () => {
  const navigation = useNavigation();
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

  return (
    <View style={styles.container}>
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
          .map((note, index) => (
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
  },
});
