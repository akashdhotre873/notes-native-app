import { StyleSheet, View } from "react-native";
import { ActionBar } from "../../components/ActionBar";
import { useNavigation } from "@react-navigation/native";
import { NOTE_EDITOR_SCREEN_PATH } from "../../helpers/pagePathHelper";

export const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <ActionBar
        addButtonLink={() => navigation.navigate(NOTE_EDITOR_SCREEN_PATH, {})}
        title="All Notes"
        closeButtonLink={() => console.log("close")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
