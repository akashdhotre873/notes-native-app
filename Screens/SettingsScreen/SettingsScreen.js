import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SettingTimeFormat } from '../../components/SettingTimeFormat';
import { SettingNewContentIconPosition } from '../../components/SettingNewContentIconPosition';
import { SettingColors } from '../../components/SettingColors';
import { getColors } from '../../dux/settings';
import { useRef } from 'react';
import { useShallowEqualSelector } from '../../hooks/useShallowEqualSelector';

export const SettingsScreen = () => {
  const navigation = useNavigation();
  const { iconPrimaryColor, primaryColor, headerTextColor } =
    useShallowEqualSelector(getColors);
  const scrollViewRef = useRef();

  const scollToView = ({ x, y }) => {
    scrollViewRef.current.scrollTo({ x, y });
  };

  return (
    <View style={{ flex: 1 }}>
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

      <ScrollView
        style={styles.settingsContainer}
        keyboardShouldPersistTaps="always"
        ref={scrollViewRef}
      >
        <SettingTimeFormat />
        <SettingNewContentIconPosition />
        <SettingColors scollToView={scollToView} />
      </ScrollView>
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
    flex: 1,
    paddingHorizontal: 24,
    marginTop: 40,
    paddingBottom: 20,
  },
});
