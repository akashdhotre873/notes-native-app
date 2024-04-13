import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { showPrompt } from '../../dux/prompt';
import { getColors } from '../../dux/settings';
import { promptCategoryType } from '../../helpers/constants';
import { getPlainText } from '../../helpers/cryptographyHelper';
import { NOTE_EDITOR_SCREEN_PATH } from '../../helpers/pagePathHelper';
import { runSearchAlgorithm } from '../../helpers/searchHelper';
import { getDateString } from '../../helpers/timeHelper';
import { useShallowEqualSelector } from '../../hooks/useShallowEqualSelector';
import { TimeDisplayComponent } from '../TimeDisplayComponent';

export const NoteListCard = ({
  note,
  selectedNoteName,
  setSelectedNoteName,
  searchValue,
}) => {
  const {
    name,
    content,
    passwordProtected,
    passwordHash,
    salt,
    dateUpdated: dateUpdatedString,
  } = note;

  const dateUpdated = new Date(dateUpdatedString);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { lockedColor, unlockedColor } = useShallowEqualSelector(getColors);

  const openNote = (password) => {
    const plainText = getPlainText(content, password);
    const newNote = { ...note };
    newNote.content = plainText;
    navigation.navigate(NOTE_EDITOR_SCREEN_PATH, {
      ...newNote,
      password,
      newNote: false,
    });
  };

  const onPress = () => {
    if (passwordProtected) {
      dispatch(
        showPrompt({
          category: promptCategoryType.CONFIRM_PASSWORD_PROMPT,
          data: { onAccept: openNote, passwordHash, salt },
        })
      );
    } else {
      navigation.navigate(NOTE_EDITOR_SCREEN_PATH, { ...note, newNote: false });
    }
  };

  const toggleName = (previousName) => {
    return previousName === name ? '' : name;
  };

  const { matches: searchValueMatches, matchedIndices } = runSearchAlgorithm({
    pattern: searchValue,
    text: name,
  });

  if (!searchValueMatches) {
    return null;
  }

  return (
    <Pressable
      style={[
        styles.container,
        selectedNoteName === name ? styles.selectedToDelete : {},
      ]}
      onPress={onPress}
      onLongPress={() => setSelectedNoteName(toggleName)}
    >
      <View
        style={
          passwordProtected
            ? [styles.lockedStyles, { backgroundColor: lockedColor }]
            : [styles.notLockedStyles, { backgroundColor: unlockedColor }]
        }
      />

      {passwordProtected && (
        <Ionicons
          name="lock-closed-sharp"
          size={10}
          color={lockedColor}
          style={styles.lockIcon}
        />
      )}
      <View style={styles.innerContainer}>
        {searchValueMatches && searchValue !== '' ? (
          <Text style={styles.name}>
            {[...name].map((nameChar, index) => {
              const shouldHighLight = matchedIndices.includes(index);
              return (
                <View
                  key={nameChar + index}
                  style={shouldHighLight ? {} : { opacity: 0.8 }}
                >
                  <Text
                    style={[
                      styles.nameChar,
                      shouldHighLight ? styles.hightLightChar : {},
                    ]}
                  >
                    {nameChar}
                  </Text>
                </View>
              );
            })}
          </Text>
        ) : (
          <Text style={styles.name}>{name}</Text>
        )}

        <View style={styles.timeContainer}>
          <Text style={styles.lastModifiedText}>Last Modified :</Text>
          <Text style={styles.dateModifiedText}>
            <TimeDisplayComponent date={dateUpdated} />
          </Text>
          <Text style={styles.dateModifiedText}>
            {getDateString(dateUpdated)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 4,
    backgroundColor: 'white',
    borderRadius: 7,
    elevation: 5,
    flexDirection: 'row',
  },
  selectedToDelete: {
    backgroundColor: '#f0ad4e',
  },
  innerContainer: {
    paddingVertical: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexGrow: 1,
  },
  name: {
    fontSize: 22,
    paddingLeft: 15,
    marginRight: 10,
    maxWidth: '60%',
    alignSelf: 'center',
  },
  timeContainer: {
    paddingRight: 15,
    paddingLeft: 3,
  },
  dateModifiedText: {
    marginLeft: 'auto',
    opacity: 0.5,
    fontSize: 10,
  },
  lastModifiedText: {
    marginLeft: 'auto',
    fontSize: 10,
    opacity: 0.9,
  },
  lockedStyles: {
    width: 7,
    borderBottomLeftRadius: 7,
    borderTopLeftRadius: 7,
    position: 'relative',
  },
  notLockedStyles: {
    width: 7,
    borderBottomLeftRadius: 7,
    borderTopLeftRadius: 7,
  },
  nameChar: {
    fontSize: 22,
  },
  hightLightChar: {
    fontWeight: 'bold',
    fontSize: 23,
  },
  lockIcon: {
    position: 'absolute',
    top: 5,
    left: 10,
  },
});
