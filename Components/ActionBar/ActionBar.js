import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export const ActionBar = ({
  title,
  leftIconLink,
  leftIconSource,
  rightIconLink,
  rightIconSource,
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
      {rightIconLink && (
        <Pressable onPress={rightIconLink} style={styles.rightButtonLink}>
          <Image source={rightIconSource} style={styles.rightButtonImage} />
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
  leftButtonImage: {
    height: 30,
    width: 30,
    resizeMode: "contain",
  },
  leftButtonLink: {
    paddingTop: -10,
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
  title: {
    paddingLeft: 20,
    fontFamily: "Roboto",
    fontSize: 18,
    fontWeight: "500",
  },
});
