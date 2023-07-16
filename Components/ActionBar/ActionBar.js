import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../../helpers/constants";

export const ActionBar = ({
  title,
  leftIconLink,
  leftIconSource,
  rightIconLink,
  rightIconSource,
  onDelete,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        {leftIconLink && (
          <Pressable onPress={leftIconLink} style={styles.leftButtonLink}>
            <Image source={leftIconSource} style={styles.leftButtonImage} />
          </Pressable>
        )}
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.rightSideIcons}>
        {onDelete && (
          <Pressable onPress={onDelete} style={styles.deleteButton}>
            <Image
              source={require("../../assets/icons/delete-black-icon.png")}
              style={styles.rightButtonImage}
            />
          </Pressable>
        )}
        {rightIconLink && (
          <Pressable onPress={rightIconLink} style={styles.rightButtonLink}>
            <Image source={rightIconSource} style={styles.rightButtonImage} />
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 50,
    backgroundColor: colors.primaryColor,
    justifyContent: "space-between",
    alignItems: "center",
  },
  innerContainer: {
    flexDirection: "row",
  },
  leftButtonImage: {
    height: 30,
    width: 30,
    resizeMode: "contain",
  },
  leftButtonLink: {
    paddingLeft: 10,
  },
  rightButtonLink: {
    paddingRight: 15,
  },
  rightButtonImage: {
    height: 30,
    width: 30,
    resizeMode: "contain",
  },
  rightSideIcons: {
    flexDirection: "row",
  },
  title: {
    paddingTop: 2,
    paddingLeft: 15,
    fontFamily: "Roboto",
    fontSize: 18,
    fontWeight: "500",
  },
  deleteButton: {
    marginRight: 20,
  },
});
