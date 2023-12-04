import { useNavigation } from '@react-navigation/native';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { colors, promptCategoryType } from '../../helpers/constants';
import { showPrompt } from '../../dux/prompt';
import { getPlainText } from '../../helpers/cryptographyHelper';
import { NOTE_EDITOR_SCREEN_PATH } from '../../helpers/pagePathHelper';
import { getDateString, getTimeString } from '../../helpers/timeHelper';
import { runSearchAlgorithm } from '../../helpers/searchHelper';

export const NoteSearchListCard = ({
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
            ? styles.colorIndicatorLocked
            : styles.colorIndicatorNotLocked
        }
      />
      <View style={styles.innerContainer}>
        <Text style={styles.name}>
          {[...name].map((nameChar, index) => {
            const shouldHighLight = matchedIndices.includes(index);
            return (
              <Text
                key={nameChar + index}
                style={shouldHighLight ? styles.hightLightChar : {}}
              >
                {nameChar}
              </Text>
            );
          })}
        </Text>

        <View style={styles.timeContainer}>
          <Text style={styles.lastModifiedText}>Last Modified :</Text>
          <Text style={styles.dateModifiedText}>
            {getTimeString(dateUpdated)}
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
  lockIcon: {},
  colorIndicatorLocked: {
    backgroundColor: colors.lockedColor,
    width: 7,
    borderBottomLeftRadius: 7,
    borderTopLeftRadius: 7,
  },
  colorIndicatorNotLocked: {
    backgroundColor: colors.unlockedColor,
    width: 7,
    borderBottomLeftRadius: 7,
    borderTopLeftRadius: 7,
  },
  hightLightChar: {
    fontWeight: 'bold',
    fontSize: 24,
  },
});
