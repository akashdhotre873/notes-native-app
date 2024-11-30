import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useRef } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { SettingColorScheme } from '../../components/SettingColorScheme';
import { SettingNewContentIconPosition } from '../../components/SettingNewContentIconPosition';
import { SettingTimeFormat } from '../../components/SettingTimeFormat';
import { TextContainer } from '../../components/TextContainer';
import { getColors } from '../../dux/settings';
import { useShallowEqualSelector } from '../../hooks/useShallowEqualSelector';

export const SettingsScreen = () => {
  const navigation = useNavigation();
  const { iconPrimaryColor, primaryColor, headerTextColor, backgroundColor } =
    useShallowEqualSelector(getColors);
  const scrollViewRef = useRef();

  const scollToView = ({ x, y }) => {
    scrollViewRef.current.scrollTo({ x, y });
  };

  return (
    <View style={{ flex: 1, backgroundColor }}>
      <View style={[styles.actionBar, { backgroundColor: primaryColor }]}>
        <Ionicons
          name="arrow-back"
          size={26}
          color={iconPrimaryColor}
          style={styles.backIcon}
          onPress={() => navigation.goBack()}
        />
        <TextContainer
          style={[styles.settingsText, { color: headerTextColor }]}
        >
          Settings
        </TextContainer>
        <View style={styles.emptySpace} />
      </View>

      <ScrollView
        style={styles.settingsContainer}
        keyboardShouldPersistTaps="always"
        ref={scrollViewRef}
      >
        <SettingTimeFormat />
        <SettingNewContentIconPosition />
        <SettingColorScheme scollToView={scollToView} />
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
