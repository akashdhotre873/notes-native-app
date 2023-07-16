import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { Tabs } from "../../components/Tabs";
import { getSelectedTab } from "../../dux/tabs";
import { NotesHomeScreen } from "../NotesHomeScreen";
import { TodosHomeScreen } from "../TodosHomeScreen";

export const HomeScreen = () => {
  const selectedTab = useSelector(getSelectedTab);

  return (
    <View style={styles.container}>
      <Tabs />
      {selectedTab === "notes" && <NotesHomeScreen />}
      {selectedTab === "todos" && <TodosHomeScreen />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
