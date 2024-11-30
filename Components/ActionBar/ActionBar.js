import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';

import { getColors } from '../../dux/settings';
import { shareMethod } from '../../helpers/constants';
import { useShallowEqualSelector } from '../../hooks/useShallowEqualSelector';
import { ActionBarMainMenu } from '../ActionBarMainMenu';
import { ActionBarSortOrderMenu } from '../ActionBarSortOrderMenu';
import { ShareContentComponent } from '../ShareContentComponent';
import { TextContainer } from '../TextContainer';

export const ActionBar = ({
  title,
  leftIcon,
  rightIcon,
  onDelete,
  contentToShare,
  allowCopyToClicpBoard,
  sortItem,
  searchValue,
  onSearchValueChange,
}) => {
  const [searching, setSearching] = useState(false);
  const { primaryColor, iconPrimaryColor, headerTextColor } =
    useShallowEqualSelector(getColors);

  return (
    <View style={[styles.container, { backgroundColor: primaryColor }]}>
      <View style={styles.innerContainer}>
        {leftIcon && leftIcon(styles.leftButtonLink)}
        {searching ? (
          <TextInput
            value={searchValue}
            onChangeText={onSearchValueChange}
            style={styles.searchTextArea}
            autoFocus
            underlineStyle={{ display: 'none' }}
            placeholder="search"
            right={
              <TextInput.Icon
                icon="close"
                onPress={() => onSearchValueChange('')}
                style={styles.closeIconForTextInput}
              />
            }
          />
        ) : (
          <TextContainer style={[styles.title, { color: headerTextColor }]}>
            {title}
          </TextContainer>
        )}
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
              color={iconPrimaryColor}
              style={styles.shareIcon}
            />
          </ShareContentComponent>
        )}

        {rightIcon && rightIcon(styles.rightButtonLink)}

        {Boolean(onSearchValueChange) && (
          <View>
            {searching ? (
              <MaterialIcons
                name="search-off"
                size={32}
                color={iconPrimaryColor}
                style={styles.searchIcon}
                onPress={() => {
                  setSearching(false);
                  onSearchValueChange('');
                }}
              />
            ) : (
              <MaterialIcons
                name="search"
                size={32}
                color={iconPrimaryColor}
                style={styles.searchIcon}
                onPress={() => setSearching(true)}
              />
            )}
          </View>
        )}

        {/* sort notes/todos menu */}
        <ActionBarSortOrderMenu sortItem={sortItem} />

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
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  innerContainer: {
    flexDirection: 'row',
    width: '60%',
  },
  leftButtonLink: {
    paddingLeft: 10,
  },
  rightButtonLink: {
    paddingRight: 15,
    alignSelf: 'center',
  },
  rightSideIcons: {
    flexDirection: 'row',
  },
  title: {
    paddingTop: 2,
    paddingLeft: 17,
    fontFamily: 'Roboto',
    fontSize: 18,
    fontWeight: '500',
  },
  deleteButton: {
    marginRight: 20,
  },
  shareIcon: {
    marginRight: 15,
  },
  searchIcon: {
    paddingRight: 10,
    paddingTop: 2,
  },
  searchTextArea: {
    marginLeft: 12,
    paddingVertical: 3,
    borderRadius: 5,
    fontSize: 18,
    width: '95%',
    backgroundColor: '#ffffff',
    height: 32,
  },
  closeIconForTextInput: {
    paddingTop: 6,
    marginRight: -5,
  },
});
