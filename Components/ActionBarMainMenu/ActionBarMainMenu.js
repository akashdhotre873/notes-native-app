import { Entypo } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Divider, Menu } from 'react-native-paper';

import { getColors } from '../../dux/settings';
import { shareMethod } from '../../helpers/constants';
import { useShallowEqualSelector } from '../../hooks/useShallowEqualSelector';
import { ShareContentComponent } from '../ShareContentComponent';

export const ActionBarMainMenu = ({
  onDelete,
  allowCopyToClicpBoard,
  contentToShare,
}) => {
  const { iconPrimaryColor } = useShallowEqualSelector(getColors);
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
          color={iconPrimaryColor}
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
  },
});
