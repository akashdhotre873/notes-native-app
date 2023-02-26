import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { NOTE_EDITOR_SCREEN_PATH } from "../helpers/pagePathHelper";

export const NoteListCard = (note) => {
  const { name, content, index } = note;
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => navigation.navigate(NOTE_EDITOR_SCREEN_PATH, note)}
      >
        <Text style={styles.name}>
          {index + 1}. {name}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 7,
    marginHorizontal: 10,
    marginVertical: 4,
    borderBottomWidth: 1,
  },
  name: {
    fontSize: 20,
  },
});
