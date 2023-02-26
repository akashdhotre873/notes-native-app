import { ScrollView, StyleSheet, View } from "react-native";
import { ActionBar } from "../../components/ActionBar";
import { useNavigation } from "@react-navigation/native";
import { NOTE_EDITOR_SCREEN_PATH } from "../../helpers/pagePathHelper";
import { useDispatch, useSelector } from "react-redux";
import { getNotes } from "../../dux/notes";
import { NoteListCard } from "../../components/NoteListCard";

export const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const notes = useSelector(getNotes);
  console.log("notes", notes);

  return (
    <View style={styles.container}>
      <ActionBar
        leftIconSource={require("../../assets/icons/plusButtonIcon.png")}
        leftIconLink={() => navigation.navigate(NOTE_EDITOR_SCREEN_PATH, {})}
        title="All Notes"
      />
      <ScrollView>
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
});
