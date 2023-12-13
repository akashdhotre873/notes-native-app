import { Alert, StyleSheet, Text, ToastAndroid, View } from 'react-native';
import { Switch } from 'react-native-paper';
import {
  getNewContentIconPosition,
  getSettings,
  updateNewContentIconDefaultPosition,
} from '../../dux/settings';
import { useDispatch, useSelector } from 'react-redux';
import {
  colors,
  newContentIconPosition,
  settingTypes,
} from '../../helpers/constants';
import { updateAndSaveSettingsToAsyncStorage } from '../../helpers/settingsHelper';
import { Ionicons } from '@expo/vector-icons';

export const SettingNewContentIconPosition = () => {
  const dispatch = useDispatch();
  const iconPosition = useSelector(getNewContentIconPosition);
  const settings = useSelector(getSettings);
  const isIconOnTheRightSide = iconPosition === newContentIconPosition.RIGHT;

  const onToggleSwitch = () => {
    const toastMessage = 'Please reload the app for this change to take effect';
    ToastAndroid.show(toastMessage, ToastAndroid.SHORT, ToastAndroid.BOTTOM);

    const newPostion = isIconOnTheRightSide
      ? newContentIconPosition.LEFT
      : newContentIconPosition.RIGHT;
    dispatch(updateNewContentIconDefaultPosition(newPostion));
    updateAndSaveSettingsToAsyncStorage({
      settings,
      settingType: settingTypes.NEW_CONTENT_ICON_POSITION,
      value: newPostion,
    });
  };

  const showInfo = () => {
    const infoMessage =
      "You can press and hold on the NewContent icon to toggle it's position temporarily. " +
      "It will get back to it's default position once the app reloads." +
      '\n\nThis setting decides its default position when app loads.';

    Alert.alert('NewContent Icon', infoMessage, null, { cancelable: true });
  };

  return (
    <View style={styles.container}>
      <View style={styles.settingHeaderContainer}>
        <Text style={styles.settingTypeText}>
          Default New Content Icon position
        </Text>
        <Ionicons
          name="information-circle-outline"
          size={16}
          color="black"
          style={styles.infoIcon}
          onPress={showInfo}
        />
      </View>

      <View style={styles.switchContainer}>
        <Text style={styles.positionText}>
          {isIconOnTheRightSide ? 'Right' : 'Left'}
        </Text>
        <Switch
          trackColor={{
            true: '#7380fa',
            false: '#91d4f2',
          }}
          thumbColor={isIconOnTheRightSide ? '#2438f0' : '#11abf2'}
          value={isIconOnTheRightSide}
          onValueChange={onToggleSwitch}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
  },
  settingTypeText: {
    fontSize: 18,
    fontWeight: '500',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 7,
    borderColor: colors.settingBoxBorderColor,
    backgroundColor: colors.settingBoxBackgroundColor,
    paddingHorizontal: 15,
  },
  positionText: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  settingHeaderContainer: {
    paddingLeft: 5,
    marginBottom: 5,
    flexDirection: 'row',
  },
  infoIcon: {
    paddingLeft: 5,
    paddingTop: 5,
    alignSelf: 'center',
  },
});
