import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Divider, Menu } from 'react-native-paper';
import { useDispatch } from 'react-redux';

import {
  getColors,
  getSettings,
  getTimeFormat,
  updateTimeFormat,
} from '../../dux/settings';
import { settingTypes, timeFormats } from '../../helpers/constants';
import { updateAndSaveSettingsToAsyncStorage } from '../../helpers/settingsHelper';
import { useShallowEqualSelector } from '../../hooks/useShallowEqualSelector';
import { TextContainer } from '../TextContainer';

const DisplayTimeFormatMenuItem = ({ timeFormat }) => {
  const selectedTimeFormat = useShallowEqualSelector(getTimeFormat);
  const isSelectedTimeFormat = timeFormat.format === selectedTimeFormat;

  return (
    <View style={styles.timeFormatMenuItemContainer}>
      <TextContainer
        style={[
          styles.timeFormatMenuItem,
          isSelectedTimeFormat ? styles.selectedTimeFormat : {},
        ]}
      >
        "{timeFormat.displayString}"
      </TextContainer>
      <View>
        <TextContainer style={styles.timeFormatExample}>
          {'   '}
          (Ex: {timeFormat.example})
        </TextContainer>
      </View>
    </View>
  );
};

export const SettingTimeFormat = () => {
  const dispatch = useDispatch();
  const [timeFormatMenuVisible, setTimeFormatMenuVisible] = useState(false);
  const selectedTimeFormat = useShallowEqualSelector(getTimeFormat);
  const selectedTimeFormatDetails = timeFormats.find(
    (currentFormat) => currentFormat.format === selectedTimeFormat
  );
  const settings = useShallowEqualSelector(getSettings);
  const { settingBoxBorderColor, settingBoxBackgroundColor } =
    useShallowEqualSelector(getColors);

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
        <TextContainer style={styles.timeFormatText}>Time Format</TextContainer>
      </View>

      <Menu
        visible={timeFormatMenuVisible}
        onDismiss={closeTimeFormatMenu}
        anchor={
          <Pressable
            onPress={() => setTimeFormatMenuVisible(true)}
            style={[
              styles.timeFormatMenuAnchor,
              {
                borderColor: settingBoxBorderColor,
                backgroundColor: settingBoxBackgroundColor,
              },
            ]}
          >
            <View style={{ flexDirection: 'row' }}>
              <TextContainer style={styles.timeFormatValue}>
                "{selectedTimeFormatDetails.displayString}"
              </TextContainer>
              <View>
                <TextContainer style={styles.timeFormatDispalyExample}>
                  {'   '}
                  (Ex: {selectedTimeFormatDetails.example})
                </TextContainer>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
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
    height: 40,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 7,
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
