import { Pressable, StyleSheet, View } from 'react-native';
import { colors } from '../../helpers/constants';
import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react';

export const NewContent = ({ iconOnClick }) => {
  const [position, setPosition] = useState({ right: 35, left: undefined });

  const changeLayout = () => {
    // if right is not undefined, set right to 35, or set right to undefined and left to 35
    setPosition(({ right }) =>
      right ? { right: undefined, left: 35 } : { right: 35, left: undefined }
    );
  };

  return (
    <View style={[styles.container, position]}>
      <Pressable
        onPress={iconOnClick}
        onLongPress={changeLayout}
        style={styles.innerContainer}
        android_ripple={{ color: 'black' }}
      >
        <AntDesign
          name="pluscircle"
          size={65}
          color={colors.primaryColor}
          style={styles.icon}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 55,
    backgroundColor: colors.primaryColor,
  },
  innerContainer: {
    elevation: 20,
    backgroundColor: 'white',
    borderRadius: 60,
  },
  icon: {
    padding: 0,
    margin: 0,
    margin: -10,
  },
  text: {
    fontSize: 45,
    includeFontPadding: false,
    color: 'white',
    borderRadius: 60,
  },
});
