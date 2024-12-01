import { StyleSheet, Text, TextInput } from 'react-native';
import type { TextInputProps } from 'react-native';
import PropTypes from 'prop-types';

import { getColors } from '../../dux/settings';
import { useShallowEqualSelector } from '../../hooks/useShallowEqualSelector';

export const TextInputContainer = ({componentRef, ...props}: TextInputProps) => {
  const { primaryTextColor, backgroundColor } = useShallowEqualSelector(getColors);

  return (
    <TextInput
      {...props}
      ref={componentRef} 
      placeholderTextColor={primaryTextColor}
      style={[styles.textStyle, { color: primaryTextColor, backgroundColor }, props.style ? props.style: {}]}
    >
      {props.children}
    </TextInput>
  );
};

const styles = StyleSheet.create({
  textStyle : {}
});

TextInputContainer.propTypes = {
  componentRef : PropTypes.any
}
