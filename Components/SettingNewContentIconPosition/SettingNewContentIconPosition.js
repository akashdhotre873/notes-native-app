import { useState } from 'react';
import { StyleSheet, Text, ToastAndroid, View } from 'react-native';
import { Switch } from 'react-native-paper';
import {
  getNewContentIconPosition,
  getSettings,
  updateNewContentIconDefaultPosition,
} from '../../dux/settings';
import { useDispatch, useSelector } from 'react-redux';
import { newContentIconPosition, settingTypes } from '../../helpers/constants';
import { updateAndSaveSettingsToAsyncStorage } from '../../helpers/settingsHelper';

export const SettingNewContentIconPosition = () => {
  const dispatch = useDispatch();
  const iconPosition = useSelector(getNewContentIconPosition);
  const settings = useSelector(getSettings);
  console.log(settings);
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

  return (
    <View style={styles.container}>
      <View style={{ paddingLeft: 5, marginBottom: 5 }}>
        <Text style={styles.settingTypeText}>
          Default New Content Icon position
        </Text>
      </View>

      <View style={styles.switchContainer}>
        <Text style={styles.positionText}>
          {isIconOnTheRightSide ? 'Right' : 'Left'}
        </Text>
        <Switch value={isIconOnTheRightSide} onValueChange={onToggleSwitch} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    // marginHorizontal: 15,
    // marginVertical: 10,
    // flexDirection: 'row',
    // justifyContent: 'space-between',
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
    borderColor: 'grey',
    backgroundColor: 'white',
    paddingHorizontal: 15,
    // paddingVertical: 7,
  },
  positionText: {
    alignSelf: 'center',
    fontSize: 16,
    // fontWeight: '500',
  },
});
