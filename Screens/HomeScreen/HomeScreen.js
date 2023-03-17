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

  return (
    <View style={styles.container}>
      <ActionBar
        leftIconSource={require("../../assets/icons/plusButtonIcon.png")}
        leftIconLink={() => navigation.navigate(NOTE_EDITOR_SCREEN_PATH, {})}
        title="All Notes"
      />
      <ScrollView style={styles.cardsContainer}>
        {Object.values(notes).map((note, index) => (
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
