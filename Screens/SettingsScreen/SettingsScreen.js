import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../helpers/constants';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SettingTimeFormat } from '../../components/SettingTimeFormat';

export const SettingsScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.actionBar}>
        <Ionicons
          name="arrow-back"
          size={26}
          color="black"
          style={styles.backIcon}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.settingsText}>Settings</Text>
        <View style={styles.emptySpace} />
      </View>

      <View style={styles.settingsContainer}>
        <SettingTimeFormat />
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
    flex: 1,
  },
  // timeFormatContainer: {
  //   marginHorizontal: 15,
  //   marginVertical: 10,
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  // },
  // timeFormatText: {
  //   fontSize: 16,
  //   fontWeight: '500',
  // },
  // timeFormatValue: {
  //   fontSize: 16,
  //   fontWeight: '400',
  // },
  // timeFormatMenuAnchor: {
  //   flexDirection: 'row',
  //   paddingLeft: 10,
  // },
  // selectedTimeFormat: {
  //   fontWeight: '700',
  // },
  // timeFormatMenuItem: {
  //   fontSize: 16,
  // },
  // timeFormatExample: {
  //   fontSize: 12,
  //   opacity: 0.5,
  //   marginTop: 4,
  // },
  // timeFormatMenuItemContainer: {
  //   flexDirection: 'row',
  // },
});
