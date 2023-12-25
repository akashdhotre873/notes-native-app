import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { getColors } from '../../dux/settings';
import { ColorCard } from './ColorCard';
import { colorType } from '../../helpers/constants';

export const SettingColors = () => {
  const { settingBoxBorderColor, settingBoxBackgroundColor, primaryColor } =
    useSelector(getColors);

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
            key={primaryColor}
            text="Primary Color"
            color={primaryColor}
            colorType={colorType.PRIMARY_COLOR}
          />
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
