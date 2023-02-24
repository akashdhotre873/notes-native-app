import { StyleSheet, View } from "react-native";
import { ActionBar } from "../../Components/ActionBar/ActionBar";

export const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <ActionBar
        backButtonLink={() => console.log("back")}
        title="Home Screen"
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
