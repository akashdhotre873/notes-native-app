import { StyleSheet, View } from "react-native";
import { ActionBar } from "../../components/ActionBar";

export const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <ActionBar
        addButtonLink={() => console.log("back")}
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
