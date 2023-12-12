import { Pressable, StyleSheet, Text, View } from 'react-native';
import { settingTypes, timeFormats } from '../../helpers/constants';
import React from 'react';
import { Divider, Menu } from 'react-native-paper';
import { updateAndSaveSettingsToAsyncStorage } from '../../helpers/settingsHelper';
import {
  getSettings,
  getTimeFormat,
  updateTimeFormat,
} from '../../dux/settings';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

const DisplayTimeFormatMenuItem = ({ timeFormat }) => {
  const selectedTimeFormat = useSelector(getTimeFormat);
  const isSelectedTimeFormat = timeFormat.format === selectedTimeFormat;

  return (
    <View style={styles.timeFormatMenuItemContainer}>
      <Text
        style={[
          styles.timeFormatMenuItem,
          isSelectedTimeFormat ? styles.selectedTimeFormat : {},
        ]}
      >
        "{timeFormat.displayString}"
      </Text>
      <View>
        <Text style={styles.timeFormatExample}>
          {' '}
          (Ex: {timeFormat.example})
        </Text>
      </View>
    </View>
  );
};

export const SettingTimeFormat = () => {
  const dispatch = useDispatch();
  const [timeFormatMenuVisible, setTimeFormatMenuVisible] = useState(false);
  const selectedTimeFormat = useSelector(getTimeFormat);
  const selectedTimeFormatDetails = timeFormats.find(
    (currentFormat) => currentFormat.format === selectedTimeFormat
  );
  const settings = useSelector(getSettings);

  const closeTimeFormatMenu = () => {
    setTimeFormatMenuVisible(false);
  };

  const onTimeFormatChange = (format) => {
    updateAndSaveSettingsToAsyncStorage({
      settings,
      settingType: settingTypes.TIME_FORMAT,
      value: format,
    });
    dispatch(updateTimeFormat(format));
    closeTimeFormatMenu();
  };

  return (
    <View style={styles.timeFormatContainer}>
      <View>
        <Text style={styles.timeFormatText}>Time Format : </Text>
      </View>
      <Menu
        visible={timeFormatMenuVisible}
        onDismiss={closeTimeFormatMenu}
        anchor={
          <Pressable
            onPress={() => setTimeFormatMenuVisible(true)}
            style={styles.timeFormatMenuAnchor}
          >
            <Text style={styles.timeFormatValue}>
              "{selectedTimeFormatDetails.displayString}"
            </Text>
            <Ionicons
              name={timeFormatMenuVisible ? 'chevron-up' : 'chevron-down'}
              size={24}
              color="black"
            />
          </Pressable>
        }
      >
        {timeFormats.map((timeFormat, index) => (
          <React.Fragment key={timeFormat.format}>
            <Menu.Item
              title={<DisplayTimeFormatMenuItem timeFormat={timeFormat} />}
              onPress={() => onTimeFormatChange(timeFormat.format)}
            />
            {index !== timeFormats.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  timeFormatContainer: {
    marginHorizontal: 15,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeFormatText: {
    fontSize: 16,
    fontWeight: '500',
  },
  timeFormatValue: {
    fontSize: 16,
    fontWeight: '400',
  },
  timeFormatMenuAnchor: {
    flexDirection: 'row',
    paddingLeft: 10,
  },
  selectedTimeFormat: {
    fontWeight: '700',
  },
  timeFormatMenuItem: {
    fontSize: 16,
  },
  timeFormatExample: {
    fontSize: 12,
    opacity: 0.5,
    marginTop: 4,
  },
  timeFormatMenuItemContainer: {
    flexDirection: 'row',
  },
});
