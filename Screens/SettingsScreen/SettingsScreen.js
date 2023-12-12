import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../helpers/constants';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SettingTimeFormat } from '../../components/SettingTimeFormat';

export const SettingsScreen = () => {
  const navigation = useNavigation();

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
  },
});
