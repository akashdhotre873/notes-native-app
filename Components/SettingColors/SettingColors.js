import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import { Divider } from 'react-native-paper';

import { ColorCard } from './ColorCard';
import { getColors } from '../../dux/settings';
import { colorType } from '../../helpers/constants';
import { useShallowEqualSelector } from '../../hooks/useShallowEqualSelector';

export const SettingColors = ({ scollToView }) => {
  const {
    settingBoxBorderColor,
    settingBoxBackgroundColor,
    primaryColor,
    lockedColor,
    unlockedColor,
    newContentIconColor,
    iconPrimaryColor,
    headerTextColor,
  } = useShallowEqualSelector(getColors);

  return (
    <View style={styles.container}>
      <View style={{ paddingLeft: 5, marginBottom: 5 }}>
        <Text style={styles.colorsText}>Colors</Text>
      </View>

      <View
        style={[
          styles.switchContainer,
          {
            borderColor: settingBoxBorderColor,
            backgroundColor: settingBoxBackgroundColor,
          },
        ]}
      >
        <View style={styles.colorsContainer}>
          <ColorCard
            key={`${colorType.PRIMARY_COLOR} ${primaryColor}`}
            text="Primary Color"
            color={primaryColor}
            colorType={colorType.PRIMARY_COLOR}
            scollToView={scollToView}
          />

          <Divider />

          <ColorCard
            key={`${colorType.LOCKED_COLOR} ${lockedColor}`}
            text="Locked content indicator"
            color={lockedColor}
            colorType={colorType.LOCKED_COLOR}
            scollToView={scollToView}
          />

          <Divider />

          <ColorCard
            key={`${colorType.UNLOCKED_COLOR} ${unlockedColor}`}
            text="Not locked content indicator"
            color={unlockedColor}
            colorType={colorType.UNLOCKED_COLOR}
            scollToView={scollToView}
          />

          <Divider />

          <ColorCard
            key={`${colorType.NEW_CONTENT_ICON_COLOR} ${newContentIconColor}`}
            text="New content icon color"
            color={newContentIconColor}
            colorType={colorType.NEW_CONTENT_ICON_COLOR}
            scollToView={scollToView}
          />

          <Divider />

          <ColorCard
            key={`${colorType.ICON_PRIMARY_COLOR} ${iconPrimaryColor}`}
            text="Icon colors"
            color={iconPrimaryColor}
            colorType={colorType.ICON_PRIMARY_COLOR}
            scollToView={scollToView}
          />

          <Divider />

          <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
            <ColorCard
              key={`${colorType.HEADER_TEXT_COLOR} ${headerTextColor}`}
              text="Header text color"
              color={headerTextColor}
              colorType={colorType.HEADER_TEXT_COLOR}
              scollToView={scollToView}
            />
          </KeyboardAvoidingView>
        </View>
      </View>
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
  colorsContainer: {
    borderWidth: 1,
    borderRadius: 7,
    paddingHorizontal: 15,
  },
});
