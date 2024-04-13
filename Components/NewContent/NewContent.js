import { AntDesign } from '@expo/vector-icons';
import { useState, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  Pressable,
  StyleSheet,
} from 'react-native';

import { getColors, getNewContentIconPosition } from '../../dux/settings';
import { newContentIconPosition } from '../../helpers/constants';
import { useKeyBoardVisible } from '../../hooks/useKeyBoardVisible';
import { useShallowEqualSelector } from '../../hooks/useShallowEqualSelector';

export const NewContent = ({ iconOnClick }) => {
  const { newContentIconColor } = useShallowEqualSelector(getColors);
  const iconPosition = useShallowEqualSelector(getNewContentIconPosition);
  const isIconOnTheRight = iconPosition === newContentIconPosition.RIGHT;
  const [isIconOnTheRightSide, setIsIconOnTheRightSide] =
    useState(isIconOnTheRight);

  const leftOffset = 35;
  const rightOffset = Dimensions.get('window').width - 80;
  const offset = isIconOnTheRightSide ? rightOffset : leftOffset;

  const animatedValue = useRef(new Animated.Value(offset)).current;

  const animationType = Easing.bounce;
  const duration = 500; // in milli seconds

  const isKeyboardVisible = useKeyBoardVisible();

  const moveToLeft = () => {
    Animated.timing(animatedValue, {
      toValue: leftOffset,
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
    if (isIconOnTheRightSide) {
      moveToLeft();
    } else {
      moveToRight();
    }
  };

  if (isKeyboardVisible) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.container,
        { backgroundColor: newContentIconColor },
        { transform: [{ translateX: animatedValue }] },
      ]}
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
          color={newContentIconColor}
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
  },
  innerContainer: {
    elevation: 20,
    backgroundColor: 'white',
    borderRadius: 60,
  },
  icon: {
    padding: 0,
    margin: -10,
  },
  text: {
    fontSize: 45,
    includeFontPadding: false,
    color: 'white',
    borderRadius: 60,
  },
});
