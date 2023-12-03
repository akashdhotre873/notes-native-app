import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, shareMethod } from '../../helpers/constants';
import { ShareContentComponent } from '../ShareContentComponent';
import { Ionicons } from '@expo/vector-icons';
import { ActionBarMainMenu } from '../ActionBarMainMenu';
import { ActionBarSortOrderMenu } from '../ActionBarSortOrderMenu/ActionBarSortOrderMenu';
import { useState } from 'react';
import { TextInput } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

export const ActionBar = ({
  title,
  leftIconLink,
  leftIconSource,
  rightIconLink,
  rightIconSource,
  onDelete,
  contentToShare,
  allowCopyToClicpBoard,
  sortItem,
  searchValue,
  setSearchValue,
}) => {
  const [searching, setSearching] = useState(false);
  // const [searchValue, setsearchValue] = useState('');

  const onChange = (newValue) => {
    setSearchValue(newValue);
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        {leftIconLink && (
          <Pressable onPress={leftIconLink} style={styles.leftButtonLink}>
            <Image source={leftIconSource} style={styles.leftButtonImage} />
          </Pressable>
        )}
        {searching ? (
          <TextInput
            value={searchValue}
            onChangeText={onChange}
            style={styles.searchTextArea}
            autoFocus
            underlineStyle={{ display: 'none' }}
            placeholder="search"
            right={
              <TextInput.Icon
                icon="close"
                onPress={() => setSearchValue('')}
                style={styles.closeIconForTextInput}
              />
            }
          />
        ) : (
          <Text style={styles.title}>{title}</Text>
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

        {Boolean(setSearchValue) && (
          <View>
            {searching ? (
              <MaterialIcons
                name="search-off"
                size={32}
                color="black"
                style={styles.searchIcon}
                onPress={() => setSearching(false)}
              />
            ) : (
              <MaterialIcons
                name="search"
                size={32}
                color="black"
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
    backgroundColor: colors.primaryColor,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  innerContainer: {
    flexDirection: 'row',
    width: '60%',
  },
  leftButtonImage: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
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
    resizeMode: 'contain',
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
