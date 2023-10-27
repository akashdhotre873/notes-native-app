import { StyleSheet } from "react-native";
import { Divider, Menu } from "react-native-paper";
import { Entypo } from "@expo/vector-icons";
import { ShareContentComponent } from "../ShareContentComponent";
import { useState } from "react";
import { colors, shareMethod } from "../../helpers/constants";

export const ActionBarMainMenu = ({
  onDelete,
  allowCopyToClicpBoard,
  contentToShare,
}) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const shouldDisplayMenu = onDelete || allowCopyToClicpBoard; // if there are more options, and one of them is present, then show menu

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

  const onCopyToClipBoardClick = () => {
    closeMenu();
  };

  if (!shouldDisplayMenu) {
    return null;
  }

  return (
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
      {allowCopyToClicpBoard && (
        <ShareContentComponent
          content={contentToShare}
          dataType={contentToShare.dataType}
          shareType={shareMethod.CLIPBOARD}
          callBack={onCopyToClipBoardClick}
        >
          <Menu.Item title="Copy" leadingIcon="content-copy" />
          <Divider />
        </ShareContentComponent>
      )}
      {onDelete && (
        <Menu.Item
          onPress={onDeleteIconClick}
          title="Delete"
          leadingIcon="delete"
        />
      )}
    </Menu>
  );
};

const styles = StyleSheet.create({
  kebabMenu: {
    paddingRight: 15,
    paddingTop: 2,
    paddingLeft: 2,
  },
});
