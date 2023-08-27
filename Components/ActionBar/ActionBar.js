import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Divider, Menu, Button } from "react-native-paper";
import { colors, dataType } from "../../helpers/constants";
import { ShareContentComponent } from "../ShareContentComponent";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Entypo } from "@expo/vector-icons";

export const ActionBar = ({
  title,
  leftIconLink,
  leftIconSource,
  rightIconLink,
  rightIconSource,
  onDelete,
  contentToShare,
}) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const displayMenu = onDelete; // if there are more options, and one of them is present, then show menu

  const closeMenu = () => {
    setMenuVisible(false);
  };

  const openMenu = () => {
    setMenuVisible(true);
  };

  const onDeleteIconClick = () => {
    closeMenu();
    onDelete();
  };

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
            dataType={contentToShare.dataType}
            content={contentToShare}
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
        {displayMenu && (
          <Menu
            visible={menuVisible}
            onDismiss={closeMenu}
            anchor={
              <Entypo
                name="dots-three-vertical"
                size={24}
                color="black"
                style={styles.kebabMenu}
                onPress={openMenu}
              />
            }
          >
            {onDelete && (
              <Menu.Item
                onPress={onDeleteIconClick}
                title="Delete"
                leadingIcon="delete"
              />
            )}
          </Menu>
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
  shareIcon: {
    marginRight: 15,
  },
  kebabMenu: {
    paddingRight: 15,
    paddingTop: 2,
    paddingLeft: 2,
  },
});
