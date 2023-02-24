import { useNavigation } from "@react-navigation/native";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewBase,
} from "react-native";

export const ActionBar = ({ title, backButtonLink, closeButtonLink }) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Pressable onPress={backButtonLink} style={styles.backButtonLink}>
          <Image
            source={require("../../assets/icons/backButtonIcon.png")}
            style={styles.backButtonImage}
          />
        </Pressable>
        <Text style={styles.title}>{title}</Text>
      </View>
      <Pressable onPress={closeButtonLink} style={styles.closeButtonLink}>
        <Image
          source={require("../../assets/icons/closeButtonIcon.png")}
          style={styles.closeButtonImage}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: "row",
    padding: 10,
    backgroundColor: "skyblue",
    justifyContent: "space-between",
  },
  innerContainer: {
    flexDirection: "row",
  },
  backButtonImage: {
    height: 30,
    width: 30,
    resizeMode: "contain",
  },
  closeButtonLink: {
    paddingRight: 10,
  },
  closeButtonImage: {
    height: 30,
    width: 30,
    resizeMode: "contain",
  },
  title: {
    paddingLeft: 30,
    fontFamily: "Roboto",
    fontSize: 18,
    fontWeight: "500",
  },
});
