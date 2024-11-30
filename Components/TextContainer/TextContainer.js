import { StyleSheet, Text } from 'react-native';
import type { TextProps } from 'react-native';

import { getColors } from '../../dux/settings';
import { useShallowEqualSelector } from '../../hooks/useShallowEqualSelector';

export const TextContainer = (props: TextProps) => {
  const { primaryTextColor } = useShallowEqualSelector(getColors);

  return (
    <Text
      {...props}
      style={[styles.textStyle, { color: primaryTextColor }, props.style ? props.style: {}]}
    >
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  textStyle : {}
});
