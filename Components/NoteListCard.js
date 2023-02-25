import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { NOTE_EDITOR_SCREEN_PATH } from "../helpers/pagePathHelper";

export const NoteListCard = ({ name, content, index }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() =>
          navigation.navigate(NOTE_EDITOR_SCREEN_PATH, {
            header: name,
            content,
          })
        }
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
