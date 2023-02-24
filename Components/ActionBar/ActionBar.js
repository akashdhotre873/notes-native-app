import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export const ActionBar = ({
  title,
  backButtonLink,
  addButtonLink,
  closeButtonLink,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        {backButtonLink && (
          <Pressable onPress={backButtonLink} style={styles.backButtonLink}>
            <Image
              source={require("../../assets/icons/backButtonIcon.png")}
              style={styles.backButtonImage}
            />
          </Pressable>
        )}
        {addButtonLink && (
          <Pressable onPress={addButtonLink} style={styles.addButtonLink}>
            <Image
              source={require("../../assets/icons/plusButtonIcon.png")}
              style={styles.addButtonImage}
            />
          </Pressable>
        )}
        <Text style={styles.title}>{title}</Text>
      </View>
      {closeButtonLink && (
        <Pressable onPress={closeButtonLink} style={styles.closeButtonLink}>
          <Image
            source={require("../../assets/icons/closeButtonIcon.png")}
            style={styles.closeButtonImage}
          />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 50,
    backgroundColor: "skyblue",
    justifyContent: "space-between",
    alignItems: "center",
  },
  innerContainer: {
    flexDirection: "row",
  },
  addButtonLink: {
    paddingTop: -10,
    paddingLeft: 10,
  },
  addButtonImage: {
    height: 30,
    width: 30,
    resizeMode: "contain",
  },
  backButtonLink: {
    paddingTop: -10,
    paddingLeft: 10,
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
    paddingLeft: 20,
    fontFamily: "Roboto",
    fontSize: 18,
    fontWeight: "500",
  },
});
