import { ScrollView, StyleSheet, View } from "react-native";
import { ActionBar } from "../../components/ActionBar";
import { useNavigation } from "@react-navigation/native";
import { NOTE_EDITOR_SCREEN_PATH } from "../../helpers/pagePathHelper";
import { useSelector } from "react-redux";
import { getNotes } from "../../dux/notes";
import { NoteListCard } from "../../components/NoteListCard";

export const HomeScreen = () => {
  const navigation = useNavigation();
  const notes = useSelector(getNotes);

  const sortAlgo = (noteFirst, noteSecond) => {
    if (noteFirst.name > noteSecond.name) {
      return 1;
    } else if (noteFirst.name < noteSecond.name) {
      return -1;
    }
    return 0;
  };

  return (
    <View style={styles.container}>
      <ActionBar
        leftIconSource={require("../../assets/icons/plusButtonIcon.png")}
        leftIconLink={() =>
          navigation.navigate(NOTE_EDITOR_SCREEN_PATH, { newNote: true })
        }
        title="All Notes"
      />
      <ScrollView style={styles.cardsContainer}>
        {Object.values(notes)
          .sort(sortAlgo)
          .map((note, index) => (
            <NoteListCard {...note} key={note.name} index={index} />
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
