import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { colors, shareMethod } from "../../helpers/constants";
import { ShareContentComponent } from "../ShareContentComponent";
import { Ionicons } from "@expo/vector-icons";
import { ActionBarMainMenu } from "../ActionBarMainMenu";

export const ActionBar = ({
  title,
  leftIconLink,
  leftIconSource,
  rightIconLink,
  rightIconSource,
  onDelete,
  contentToShare,
  allowCopyToClicpBoard,
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
        {contentToShare && (
          <ShareContentComponent
            content={contentToShare}
            dataType={contentToShare.dataType}
            shareType={shareMethod.EXTERANL_DIALOG}
          >
            <Ionicons
              name="share-outline"
              size={30}
              color="black"
              style={styles.shareIcon}
            />
          </ShareContentComponent>
        )}
        {rightIconLink && (
          <Pressable onPress={rightIconLink} style={styles.rightButtonLink}>
            <Image source={rightIconSource} style={styles.rightButtonImage} />
          </Pressable>
        )}

        {/* shows menu icon which contains copy to clipboard and delete function */}
        <ActionBarMainMenu
          onDelete={onDelete}
          allowCopyToClicpBoard={allowCopyToClicpBoard}
          contentToShare={contentToShare}
        />
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
  shareIcon: {
    marginRight: 15,
  },
});
