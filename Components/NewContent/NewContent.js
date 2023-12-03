import {
  Animated,
  Dimensions,
  Easing,
  Pressable,
  StyleSheet,
} from 'react-native';
import { colors } from '../../helpers/constants';
import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react';
import { useRef } from 'react';

export const NewContent = ({ iconOnClick }) => {
  const rightOffset = Dimensions.get('window').width - 80;
  const animatedValue = useRef(new Animated.Value(rightOffset)).current;
  const [isIconOnTheRightSide, setIsIconOnTheRightSide] = useState(true);

  const animationType = Easing.bounce;
  const duration = 500; // in milli seconds

  const moveToLeft = () => {
    Animated.timing(animatedValue, {
      toValue: 35,
      duration,
      easing: animationType,
      useNativeDriver: true,
    }).start(() => setIsIconOnTheRightSide(false));
  };

  const moveToRight = () => {
    Animated.timing(animatedValue, {
      toValue: rightOffset,
      duration,
      easing: animationType,
      useNativeDriver: true,
    }).start(() => setIsIconOnTheRightSide(true));
  };

  const toggleLayout = () => {
    isIconOnTheRightSide ? moveToLeft() : moveToRight();
  };

  return (
    <Animated.View
      style={[styles.container, { transform: [{ translateX: animatedValue }] }]}
    >
      <Pressable
        onPress={iconOnClick}
        onLongPress={toggleLayout}
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
    </Animated.View>
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
