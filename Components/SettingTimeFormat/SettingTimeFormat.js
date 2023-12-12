import { Pressable, StyleSheet, Text, View } from 'react-native';
import { settingTypes, timeFormats } from '../../helpers/constants';
import React from 'react';
import { Divider, List, Menu } from 'react-native-paper';
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
          {'   '}
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
    <View style={styles.container}>
      <View style={{ paddingLeft: 5, marginBottom: 5 }}>
        <Text style={styles.timeFormatText}>Time Format</Text>
      </View>

      <Menu
        visible={timeFormatMenuVisible}
        onDismiss={closeTimeFormatMenu}
        anchor={
          <Pressable
            onPress={() => setTimeFormatMenuVisible(true)}
            style={styles.timeFormatMenuAnchor}
          >
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.timeFormatValue}>
                "{selectedTimeFormatDetails.displayString}"
              </Text>
              <View>
                <Text style={styles.timeFormatDispalyExample}>
                  {'   '}
                  (Ex: {selectedTimeFormatDetails.example})
                </Text>
              </View>
            </View>
            <Ionicons
              name={timeFormatMenuVisible ? 'chevron-up' : 'chevron-down'}
              size={24}
              color="black"
            />
          </Pressable>
        }
        style={{ width: '88%' }}
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
      <View style={{ flex: 1 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  timeFormatContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 0,
  },
  timeFormatText: {
    fontSize: 18,
    fontWeight: '500',
  },
  timeFormatValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  timeFormatDispalyExample: {
    marginTop: 2,
    fontSize: 14,
    opacity: 0.7,
  },
  timeFormatMenuAnchor: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderWidth: 1,
    borderRadius: 7,
    borderColor: 'grey',
    // elevation: 10,
    backgroundColor: 'white',
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
    // flex: 1,
  },
});
