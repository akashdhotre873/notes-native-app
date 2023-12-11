import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, timeFormats } from '../../helpers/constants';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Divider, Menu } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { getTimeFormat, updateTimeFormat } from '../../dux/settings';

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

export const SettingsScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [timeFormatMenuVisible, setTimeFormatMenuVisible] = useState(false);
  const selectedTimeFormat = useSelector(getTimeFormat);
  const selectedTimeFormatDetails = timeFormats.find(
    (currentFormat) => currentFormat.format === selectedTimeFormat
  );

  const closeTimeFormatMenu = () => {
    setTimeFormatMenuVisible(false);
  };

  const onTimeFormatChange = (format) => {
    dispatch(updateTimeFormat(format));
    closeTimeFormatMenu();
  };

  return (
    <View>
      <View style={styles.actionBar}>
        <Ionicons
          name="arrow-back"
          size={26}
          color="black"
          style={styles.backIcon}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.settingsText}>Settings</Text>
        <View></View>
      </View>

      <View style={styles.settingsContainer}>
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
                  {selectedTimeFormatDetails.displayString}
                </Text>
                <Ionicons name="chevron-down" size={24} color="black" />
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  actionBar: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: colors.primaryColor,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backIcon: {
    paddingLeft: 10,
  },
  settingsText: {
    paddingTop: 2,
    paddingLeft: 17,
    fontFamily: 'Roboto',
    fontSize: 18,
    fontWeight: '500',
  },
  saveIcon: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
    marginRight: 15,
  },
  settingsContainer: {
    marginHorizontal: 24,
    marginTop: 50,
    borderWidth: 1,
    borderRadius: 7,
    borderColor: 'grey',
  },
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
