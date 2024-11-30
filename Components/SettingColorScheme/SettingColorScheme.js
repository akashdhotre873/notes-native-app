import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { StyleSheet, View, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import {
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

  const setColorScheme = (selectedColorScheme) => {
    dispatch(updateColorScheme({ colorScheme: selectedColorScheme }));

    updateAndSaveSettingsToAsyncStorage({
      settings,
      settingType: settingTypes.COLOR_SCHEME,
      value: selectedColorScheme,
    });
  };

  const getStylesBasedOnLifecycle = (
    schemeOfButton,
    activeStyles,
    inactiveStyles
  ) => {
    return colorScheme === schemeOfButton ? activeStyles : inactiveStyles;
  };

  return (
    <View style={styles.container}>
      <View style={{ paddingLeft: 5, marginBottom: 5 }}>
        <TextContainer style={styles.colorsText}>Colors</TextContainer>
      </View>

      <View style={styles.buttonsContainer}>
        <Pressable
          style={[
            styles.button,
            styles.lightButtonContainer,
            getStylesBasedOnLifecycle(
              colorSchemes.LIGHT,
              styles.lightButtonContainerActive,
              {}
            ),
          ]}
          onPress={() => setColorScheme(colorSchemes.LIGHT)}
        >
          <MaterialIcons
            style={styles.icon}
            name="light-mode"
            size={getStylesBasedOnLifecycle(colorSchemes.LIGHT, 28, 24)}
            color={getStylesBasedOnLifecycle(
              colorSchemes.LIGHT,
              'black',
              'white'
            )}
          />
          <TextContainer
            style={[
              styles.buttonText,
              styles.lightButton,
              getStylesBasedOnLifecycle(
                colorSchemes.LIGHT,
                styles.lightButtonActive,
                {}
              ),
            ]}
          >
            Light
          </TextContainer>
        </Pressable>
        <Pressable
          style={[
            styles.button,
            styles.darkButtonContainer,
            getStylesBasedOnLifecycle(
              colorSchemes.DARK,
              styles.darkButtonContainerActive,
              {}
            ),
          ]}
          // background={PressableRipp}
          onPress={() => setColorScheme(colorSchemes.DARK)}
        >
          <MaterialIcons
            style={styles.icon}
            name="dark-mode"
            size={getStylesBasedOnLifecycle(colorSchemes.DARK, 28, 24)}
            color={getStylesBasedOnLifecycle(
              colorSchemes.DARK,
              'white',
              'black'
            )}
          />
          <TextContainer
            style={[
              styles.buttonText,
              styles.darkButton,
              getStylesBasedOnLifecycle(
                colorSchemes.DARK,
                styles.darkButtonActive,
                {}
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
              colorSchemes.CUSTOM,
              styles.customButtonContainerActive,
              {}
            ),
          ]}
          onPress={() => setColorScheme(colorSchemes.CUSTOM)}
        >
          <MaterialIcons
            style={styles.icon}
            name="mode-edit"
            size={getStylesBasedOnLifecycle(colorSchemes.CUSTOM, 28, 24)}
            color={getStylesBasedOnLifecycle(
              colorSchemes.CUSTOM,
              'black',
              'white'
            )}
          />
          <TextContainer
            style={[
              styles.buttonText,
              styles.customButton,
              getStylesBasedOnLifecycle(
                colorSchemes.LIGHT,
                styles.customButtonActive,
                {}
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
    // backgroundColor: 'yellow',
    marginHorizontal: 15,
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: 9,
    // paddingHorizontal: 15,
    backgroundColor: 'red',
    flexDirection: 'column',
    // alignContent: 'center',
    // alignItems: 'center',
    // marginHorizontal: 1,
  },
  buttonText: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    // backgroundColor: 'yellow',
  },
  lightButtonContainer: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    backgroundColor: 'black',
  },
  darkButtonContainer: {
    backgroundColor: 'white',
  },
  customButtonContainer: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  lightButtonContainerActive: {
    elevation: 50,
    backgroundColor: 'white',
  },
  darkButtonContainerActive: {
    elevation: 50,
    backgroundColor: 'black',
  },
  customButtonContainerActive: {
    elevation: 50,
  },
  lightButton: {
    color: 'white',
  },
  darkButton: {
    color: 'black',
  },
  customButton: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  lightButtonActive: {
    color: 'black',
  },
  darkButtonActive: {
    color: 'white',
  },
  customButtonActive: {},
  icon: {
    alignSelf: 'center',

    // backgroundColor: 'green',
  },
});
