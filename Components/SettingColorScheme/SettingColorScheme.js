import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { StyleSheet, View, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import {
  getColors,
  getColorScheme,
  getSettings,
  updateColorScheme,
} from '../../dux/settings';
import { colorSchemes, settingTypes } from '../../helpers/constants';
import { updateAndSaveSettingsToAsyncStorage } from '../../helpers/settingsHelper';
import { useShallowEqualSelector } from '../../hooks/useShallowEqualSelector';
import { SettingColors } from '../SettingColors';
import { TextContainer } from '../TextContainer';

export const SettingColorScheme = ({ scollToView }) => {
  const dispatch = useDispatch();
  const colorScheme = useSelector(getColorScheme);
  const settings = useShallowEqualSelector(getSettings);
  const { settingBoxBorderColor } = useShallowEqualSelector(getColors);

  const setColorScheme = (selectedColorScheme) => {
    dispatch(updateColorScheme({ colorScheme: selectedColorScheme }));

    updateAndSaveSettingsToAsyncStorage({
      settings,
      settingType: settingTypes.COLOR_SCHEME,
      value: selectedColorScheme,
    });
  };

  const getStylesBasedOnLifecycle = (
    lightSchemeStyles,
    darkSchemeStyles,
    customSchemeStyles
  ) => {
    if (colorSchemes.LIGHT === colorScheme) return lightSchemeStyles;
    if (colorSchemes.DARK === colorScheme) return darkSchemeStyles;
    return customSchemeStyles;
  };

  return (
    <View style={styles.container}>
      <View style={{ paddingLeft: 5, marginBottom: 5 }}>
        <TextContainer style={styles.colorsText}>Color Scheme</TextContainer>
      </View>

      <View
        style={[
          styles.buttonsContainer,
          { borderColor: settingBoxBorderColor },
        ]}
      >
        <Pressable
          style={[
            styles.button,
            styles.lightButtonContainer,
            getStylesBasedOnLifecycle(
              styles.lightButtonContainerLightScheme,
              styles.lightButtonContainerDarkScheme,
              styles.lightButtonContainerCusomScheme
            ),
          ]}
          onPress={() => setColorScheme(colorSchemes.LIGHT)}
        >
          <MaterialIcons
            style={[
              styles.icon,
              getStylesBasedOnLifecycle(
                styles.lightIconLightScheme,
                styles.lightIconDarkScheme,
                styles.lightIconCustomScheme
              ),
            ]}
            name="light-mode"
            size={24} //{getStylesBasedOnLifecycle(30, 24, 24)}
            color={getStylesBasedOnLifecycle('black', 'white', 'black')}
          />
          <TextContainer
            style={[
              styles.buttonText,
              getStylesBasedOnLifecycle(
                styles.lightButtonLightScheme,
                styles.lightButtonDarkScheme,
                styles.lightButtonCusomScheme
              ),
            ]}
          >
            Light
          </TextContainer>
        </Pressable>

        {/* <View style={{ height: '50%', width: 1 }} /> */}

        <Pressable
          style={[
            styles.button,
            styles.darkButtonContainer,
            getStylesBasedOnLifecycle(
              styles.darkButtonContainerLightScheme,
              styles.darkButtonContainerDarkScheme,
              styles.darkButtonContainerCusomScheme
            ),
          ]}
          // background={PressableRipp}
          onPress={() => setColorScheme(colorSchemes.DARK)}
        >
          <MaterialIcons
            style={[
              styles.icon,
              getStylesBasedOnLifecycle(
                styles.darkIconLightScheme,
                styles.darkIconDarkScheme,
                styles.darkIconCustomScheme
              ),
            ]}
            name="dark-mode"
            size={24} //{getStylesBasedOnLifecycle(24, 30, 24)}
            color={getStylesBasedOnLifecycle('black', 'white', 'black')}
          />
          <TextContainer
            style={[
              styles.buttonText,
              getStylesBasedOnLifecycle(
                styles.darkButtonLightScheme,
                styles.darkButtonDarkScheme,
                styles.darkButtonCustomScheme
              ),
            ]}
          >
            Dark
          </TextContainer>
        </Pressable>
        <Pressable
          style={[
            styles.button,
            styles.customButtonContainer,
            getStylesBasedOnLifecycle(
              styles.customButtonContainerLightScheme,
              styles.customButtonContainerDarkScheme,
              styles.customButtonContainerCustomScheme
            ),
          ]}
          onPress={() => setColorScheme(colorSchemes.CUSTOM)}
        >
          <MaterialIcons
            style={[
              styles.icon,
              getStylesBasedOnLifecycle(
                styles.customIconLightScheme,
                styles.customIconDarkScheme,
                styles.customIconCustomScheme
              ),
            ]}
            name="mode-edit"
            size={24} //{getStylesBasedOnLifecycle(30, 30, 24)}
            color={getStylesBasedOnLifecycle('black', 'white', 'black')}
          />
          <TextContainer
            style={[
              styles.buttonText,
              getStylesBasedOnLifecycle(
                styles.customButtonLightScheme,
                styles.customButtonDarkScheme,
                styles.customButtonCustomScheme
              ),
            ]}
          >
            Custom
          </TextContainer>
        </Pressable>
      </View>

      {colorSchemes.CUSTOM === colorScheme && (
        <View>
          <SettingColors scollToView={scollToView} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
  },
  colorsText: {
    fontSize: 18,
    fontWeight: '500',
  },
  buttonsContainer: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 8,
  },
  button: {
    flex: 1,
    padding: 9,
    flexDirection: 'column',
  },
  buttonText: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
  },
  lightButtonContainer: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  darkButtonContainer: {},
  customButtonContainer: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  lightButtonContainerLightScheme: {
    elevation: 50,
    backgroundColor: 'white',
  },
  lightButtonContainerDarkScheme: {
    backgroundColor: '#37373d',
  },
  lightButtonContainerCusomScheme: {},
  darkButtonContainerLightScheme: {},
  darkButtonContainerDarkScheme: {
    elevation: 50,
    backgroundColor: 'black',
  },
  darkButtonContainerCustomScheme: {
    backgroundColor: 'white',
  },
  customButtonContainerLightScheme: {},
  customButtonContainerDarkScheme: {
    backgroundColor: '#37373d',
  },
  customButtonContainerCustomScheme: {
    elevation: 50,
    backgroundColor: 'white',
  },
  lightButtonLightScheme: {
    color: 'black',
  },
  lightButtonDarkScheme: {
    color: 'white',
    opacity: 0.3,
  },
  darkButtonLightScheme: {
    color: 'black',
    opacity: 0.3,
  },
  darkButtonDarkScheme: {
    color: 'white',
  },
  customButtonLightScheme: {
    opacity: 0.3,
  },
  customButtonDarkScheme: {
    opacity: 0.3,
  },
  customButtonCustomScheme: {
    color: 'black',
  },

  icon: {
    alignSelf: 'center',
  },
  lightIconLightScheme: {},
  lightIconDarkScheme: {
    opacity: 0.3,
  },
  lightIconCustomScheme: {
    opacity: 0.3,
  },
  darkIconLightScheme: {
    opacity: 0.3,
  },
  darkIconDarkScheme: {},
  darkIconCustomScheme: {
    opacity: 0.3,
  },
  customIconLightScheme: {
    opacity: 0.3,
  },
  customIconDarkScheme: {
    opacity: 0.3,
  },
  customIconCustomScheme: {},
});
