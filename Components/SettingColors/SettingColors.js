import { KeyboardAvoidingView, StyleSheet, View } from 'react-native';
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
    backgroundColor,
    primaryTextColor,
    cardBackgroundColor,
  } = useShallowEqualSelector(getColors);

  return (
    <View style={styles.container}>
      <View
        style={[
          {
            borderRadius: 7,
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
            key={`${colorType.BACKGROUND_COLOR} ${backgroundColor}`}
            text="Background color"
            color={backgroundColor}
            colorType={colorType.BACKGROUND_COLOR}
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

          <ColorCard
            key={`${colorType.PRIMARY_TEXT_COLOR} ${primaryTextColor}`}
            text="Primary Text Color"
            color={primaryTextColor}
            colorType={colorType.PRIMARY_TEXT_COLOR}
            scollToView={scollToView}
          />

          <Divider />

          <ColorCard
            key={`${colorType.CARD_BACKGROUND_COLOR} ${cardBackgroundColor}`}
            text="Card Background Color"
            color={cardBackgroundColor}
            colorType={colorType.CARD_BACKGROUND_COLOR}
            scollToView={scollToView}
          />

          <Divider />

          <Divider />

          <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
            <ColorCard
              key={`${colorType.SETTING_BOX_BACKGROUND_COLOR} ${settingBoxBackgroundColor}`}
              text="Setting Box Background Color"
              color={settingBoxBackgroundColor}
              colorType={colorType.SETTING_BOX_BACKGROUND_COLOR}
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
    marginTop: 10,
    borderRadius: 7,
  },

  colorsContainer: {
    borderWidth: 1,
    borderRadius: 7,
    paddingHorizontal: 15,
  },
});
