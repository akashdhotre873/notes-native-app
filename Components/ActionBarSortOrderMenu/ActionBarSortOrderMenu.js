import { StyleSheet } from 'react-native';
import { Divider, Menu } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  sortOrder as sortOrderConstant,
  sortParameter,
} from '../../helpers/constants';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSortInfo, getSortInfoFor, updateSortInfo } from '../../dux/sort';
import { updateSortingInfoInAsync } from '../../helpers/sortHelper';
import { getColors } from '../../dux/settings';

const { ASCENDING, DESCENDING } = sortOrderConstant;

export const ActionBarSortOrderMenu = ({ sortItem }) => {
  const dispatch = useDispatch();
  const { selectedSortParameter, selectedSortOrder } = useSelector(
    getSortInfoFor(sortItem)
  );
  const allSortingInfo = useSelector(getAllSortInfo);
  const { iconPrimaryColor } = useSelector(getColors);

  const [menuVisible, setMenuVisible] = useState(false);
  const shouldDisplayMenu = !!sortItem;
  const sortedInAscendingOrder = selectedSortOrder === ASCENDING;

  const closeMenu = () => {
    setMenuVisible(false);
  };

  const openMenu = () => {
    setMenuVisible(true);
  };

  const getFilpedSortOrder = (sortOrder) => {
    return sortOrder === ASCENDING ? DESCENDING : ASCENDING;
  };

  const onClick = (newSortParameter) => {
    closeMenu();

    // if same parameter is selected, sort in reverse order, if other parameter is selected sort in ascending order of new parameter
    const newSortOrder =
      selectedSortParameter === newSortParameter
        ? getFilpedSortOrder(selectedSortOrder)
        : ASCENDING;

    dispatch(
      updateSortInfo({
        sortItem,
        sortOrder: newSortOrder,
        sortParameter: newSortParameter,
      })
    );
    updateSortingInfoInAsync({
      allSortingInfo,
      sortItem,
      sortOrder: newSortOrder,
      sortParameter: newSortParameter,
    });
  };

  if (!shouldDisplayMenu) {
    return null;
  }

  const getIconForSortOrderMenuItem = (
    currentSortParameter,
    ascendingIcon,
    descendingIcon
  ) => {
    if (selectedSortParameter !== currentSortParameter) return ascendingIcon;
    return sortedInAscendingOrder ? descendingIcon : ascendingIcon;
  };

  return (
    <Menu
      visible={menuVisible}
      onDismiss={closeMenu}
      anchor={
        <MaterialCommunityIcons
          name="sort"
          size={28}
          color={iconPrimaryColor}
          onPress={openMenu}
          style={styles.kebabMenu}
        />
      }
    >
      <Menu.Item
        onPress={() => onClick(sortParameter.NAME)}
        title="By Name"
        leadingIcon={getIconForSortOrderMenuItem(
          sortParameter.NAME,
          'sort-alphabetical-ascending',
          'sort-alphabetical-descending'
        )}
      />
      <Divider />
      <Menu.Item
        onPress={() => onClick(sortParameter.LAST_MODIFIED)}
        title="Last Modified"
        leadingIcon={getIconForSortOrderMenuItem(
          sortParameter.LAST_MODIFIED,
          'sort-clock-ascending-outline',
          'sort-clock-descending-outline'
        )}
      />
      <Divider />
      <Menu.Item
        onPress={() => onClick(sortParameter.DATE_CREATED)}
        title="Date Created"
        leadingIcon={getIconForSortOrderMenuItem(
          sortParameter.DATE_CREATED,
          'sort-calendar-ascending',
          'sort-calendar-descending'
        )}
      />
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
