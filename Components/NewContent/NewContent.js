import {
  Animated,
  Dimensions,
  Easing,
  Pressable,
  StyleSheet,
} from 'react-native';
import { colors, newContentIconPosition } from '../../helpers/constants';
import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { getNewContentIconPosition } from '../../dux/settings';
import { useKeyBoardVisible } from '../../hooks/useKeyBoardVisible';

export const NewContent = ({ iconOnClick }) => {
  const iconPosition = useSelector(getNewContentIconPosition);
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
    isIconOnTheRightSide ? moveToLeft() : moveToRight();
  };

  if (isKeyboardVisible) {
    return null;
  }

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
    backgroundColor: colors.newContentIconColor,
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
