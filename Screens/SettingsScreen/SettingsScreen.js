import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SettingTimeFormat } from '../../components/SettingTimeFormat';
import { SettingNewContentIconPosition } from '../../components/SettingNewContentIconPosition';
import { useSelector } from 'react-redux';
import { getColors } from '../../dux/settings';

export const SettingsScreen = () => {
  const navigation = useNavigation();
  const { iconPrimaryColor, primaryColor, headerTextColor } =
    useSelector(getColors);

  return (
    <View>
      <View style={[styles.actionBar, { backgroundColor: primaryColor }]}>
        <Ionicons
          name="arrow-back"
          size={26}
          color={iconPrimaryColor}
          style={styles.backIcon}
          onPress={() => navigation.goBack()}
        />
        <Text style={[styles.settingsText, { color: headerTextColor }]}>
          Settings
        </Text>
        <View style={styles.emptySpace} />
      </View>

      <View style={styles.settingsContainer}>
        <SettingTimeFormat />
        <SettingNewContentIconPosition />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  actionBar: {
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backIcon: {
    paddingLeft: 10,
  },
  emptySpace: {
    width: 40,
  },
  settingsText: {
    fontFamily: 'Roboto',
    fontSize: 18,
    fontWeight: '500',
  },
  settingsContainer: {
    marginHorizontal: 24,
    marginTop: 40,
  },
});
