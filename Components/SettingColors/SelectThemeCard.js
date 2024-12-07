import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, View } from 'react-native';
import { Divider, Menu } from 'react-native-paper';
import { useDispatch } from 'react-redux';

import { getColors, getSettings, updateColor } from '../../dux/settings';
import { colorType, settingTypes } from '../../helpers/constants';
import { updateAndSaveSettingsToAsyncStorage } from '../../helpers/settingsHelper';
import { useShallowEqualSelector } from '../../hooks/useShallowEqualSelector';
import { TextContainer } from '../TextContainer';

export const SelectThemeCard = () => {
  const dispatch = useDispatch();

  const colors = useShallowEqualSelector(getColors);
  const settings = useShallowEqualSelector(getSettings);
  const { settingBoxBorderColor, settingBoxBackgroundColor, themeColor } =
    useShallowEqualSelector(getColors);

  const [menuVisible, setMenuVisible] = useState(false);

  const closeMenu = () => {
    setMenuVisible(false);
  };

  const onSelectTheme = (themeValue) => {
    dispatch(
      updateColor({ color: themeValue, colorType: colorType.THEME_COLOR })
    );
    const updatedColors = { ...colors, [colorType]: themeValue };
    updateAndSaveSettingsToAsyncStorage({
      settings,
      settingType: settingTypes.COLORS,
      value: updatedColors,
    });

    closeMenu();
  };

  const themes = [
    { name: 'Light', value: 'light' },
    { name: 'Dark', value: 'dark' },
  ];

  const showInfo = () => {
    const infoMessage =
      'This setting decides the color the these items.' +
      ' \n1. Theme of status bar. \n2. Theme of drop downs.';

    Alert.alert('Theme Color', infoMessage, null, { cancelable: true });
  };

  return (
    <View style={styles.container}>
      <Menu
        visible={menuVisible}
        onDismiss={closeMenu}
        anchor={
          <View
            style={[
              styles.themeColorMenuAnchor,
              {
                borderColor: settingBoxBorderColor,
                backgroundColor: settingBoxBackgroundColor,
              },
            ]}
          >
            <Pressable
              style={{
                flexDirection: 'row',
              }}
              onPress={showInfo}
            >
              <TextContainer style={styles.themeText}>Theme </TextContainer>
              <Ionicons
                name="information-circle-outline"
                size={16}
                color="black"
                style={styles.infoIcon}
              />
            </Pressable>
            <Pressable
              style={{ flexDirection: 'row' }}
              onPress={() => setMenuVisible(true)}
            >
              <TextContainer style={styles.themeText}>
                {themeColor === 'light' ? 'Light' : 'Dark'}
              </TextContainer>

              <Ionicons
                name={menuVisible ? 'chevron-up' : 'chevron-down'}
                size={24}
                color="black"
              />
            </Pressable>
          </View>
        }
        style={{ width: '80%' }}
      >
        {themes.map(({ name: themeName, value: themeValue }, index) => (
          <React.Fragment key={themeName}>
            <Menu.Item
              title={<TextContainer>{themeName} </TextContainer>}
              onPress={() => onSelectTheme(themeValue)}
            />
            {index !== themes.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  textContainer: {
    paddingVertical: 9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    flex: 7,
    fontSize: 16,
    fontWeight: '500',
  },

  themeText: {
    fontSize: 16,
    fontWeight: '500',
  },

  themeColorMenuAnchor: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 40,
    alignItems: 'center',
  },
  infoIcon: {
    paddingTop: 3,
  },
});
