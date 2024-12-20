import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useDispatch } from 'react-redux';

import { getColors, getSettings, updateColor } from '../../dux/settings';
import { recognizedColors, settingTypes } from '../../helpers/constants';
import { updateAndSaveSettingsToAsyncStorage } from '../../helpers/settingsHelper';
import { useShallowEqualSelector } from '../../hooks/useShallowEqualSelector';
import { TextContainer } from '../TextContainer';

const ColorBox = ({ color, style = {} }) => (
  <View style={[styles.colorBox, { backgroundColor: color }, style]} />
);

const EllipsisText = ({ text }) => {
  if (text.length > 8) {
    return <TextContainer>{text.slice(0, 6)}...</TextContainer>;
  }
  return <TextContainer>{text}</TextContainer>;
};

export const ColorCard = ({ text, color, colorType, scollToView }) => {
  const dispatch = useDispatch();
  const [colorValue, setColorValue] = useState(color);
  const [editing, setEditing] = useState(false);
  const colors = useShallowEqualSelector(getColors);
  const settings = useShallowEqualSelector(getSettings);

  const onSave = () => {
    setEditing(false);
    dispatch(updateColor({ color: colorValue, colorType }));

    const updatedColors = { ...colors, [colorType]: colorValue };
    updateAndSaveSettingsToAsyncStorage({
      settings,
      settingType: settingTypes.COLORS,
      value: updatedColors,
    });
  };

  const onCancel = () => {
    setEditing(false);
    setColorValue(color);
  };

  const onChange = (newValue) => {
    setColorValue(newValue.toLowerCase());
  };

  const onLayout = (event) => {
    const layout = event.nativeEvent.layout;
    if (!editing) {
      return;
    }

    // using setTimeout as a work around for bug in react native
    setTimeout(
      () =>
        scollToView({
          x: layout.x,
          y: layout.y,
        }),
      100
    );
  };

  const regex = /(^#[a-f0-9]{3}$)|(^#[a-f0-9]{6}$)/;
  const isValidColor =
    regex.test(colorValue) || recognizedColors.includes(colorValue);

  return (
    <View
      style={[styles.container, editing ? { paddingBottom: 25 } : {}]}
      onLayout={onLayout}
    >
      <View style={styles.colorContainer}>
        <TextContainer style={styles.text}>{text}</TextContainer>

        <View
          style={[
            styles.colorValueContainer,
            editing ? { justifyContent: 'flex-end' } : {},
          ]}
        >
          {isValidColor ? (
            <ColorBox color={editing ? colorValue : color} />
          ) : (
            <View style={styles.errorTextContainer}>
              <MaterialIcons
                name="error-outline"
                size={14}
                color="red"
                style={styles.errorIcon}
              />
              <TextContainer numberOfLines={1} style={styles.invalidColorText}>
                Invalid color
              </TextContainer>
            </View>
          )}
          {!editing && (
            <Pressable
              onPress={() => setEditing(true)}
              style={{ flexDirection: 'row' }}
            >
              <TextContainer style={styles.colorText}>
                <EllipsisText text={color} />
              </TextContainer>
              <Feather
                name="edit-2"
                size={16}
                color="black"
                style={styles.editIcon}
              />
            </Pressable>
          )}
        </View>
      </View>

      {editing && (
        <View>
          <TextInput
            value={colorValue}
            onChangeText={onChange}
            style={[
              styles.editColorValueArea,
              isValidColor ? {} : styles.editColorValueAreaError,
            ]}
            autoFocus
            underlineStyle={{ display: 'none' }}
            placeholder="Enter color"
            maxLength={20}
            selectTextOnFocus
            right={
              <TextInput.Icon
                icon="close"
                onPress={() => setColorValue('')}
                style={styles.closeIconForTextInput}
              />
            }
          />

          <View style={styles.buttonsContainer}>
            <Pressable onPress={onCancel} style={styles.cancelButton}>
              <TextContainer style={styles.buttonText}>Cancel</TextContainer>
            </Pressable>

            <Pressable
              onPress={onSave}
              style={[
                styles.saveButton,
                isValidColor
                  ? styles.saveButtonEnabled
                  : styles.saveButtonDisabled,
              ]}
              disabled={!isValidColor}
            >
              <TextContainer style={styles.buttonText}>Save</TextContainer>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  colorContainer: {
    paddingVertical: 9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  colorValueContainer: {
    flexDirection: 'row',
    flex: 3,
    justifyContent: 'space-between',
  },
  colorBox: {
    width: 14,
    height: 14,
    alignSelf: 'center',
    borderRadius: 1,
    marginRight: 5,
  },
  editIcon: {
    paddingLeft: 5,
  },
  text: {
    flex: 7,
    fontSize: 16,
    fontWeight: '500',
  },
  colorText: {
    fontSize: 14,
    fontWeight: '500',
  },
  editColorValueArea: {
    marginBottom: 5,
    paddingVertical: 4,
    borderRadius: 5,
    fontSize: 18,
    height: 32,
    borderColor: '#2196F3',
    borderWidth: 1,
  },
  editColorValueAreaError: {
    borderColor: 'red',
    borderWidth: 1,
  },
  closeIconForTextInput: {
    paddingTop: 6,
    marginRight: -5,
  },
  saveButton: {
    flex: 1,
    paddingVertical: 6,
    borderRadius: 5,
    elevation: 5,
    marginBottom: 7,
    marginLeft: 5,
  },
  saveButtonEnabled: {
    backgroundColor: '#2196F3',
  },
  saveButtonDisabled: {
    backgroundColor: 'gray',
  },
  buttonText: {
    alignSelf: 'center',
    fontSize: 20,
  },
  cancelButton: {
    flex: 1,
    marginBottom: 7,
    paddingVertical: 6,
    borderRadius: 5,
    backgroundColor: 'white',
    marginRight: 5,
    borderWidth: 1,
    borderColor: '#2196F3',
  },
  errorMessage: {
    color: 'red',
    fontSize: 12,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  invalidColorText: {
    fontSize: 12,
    color: 'red',
  },
  errorIcon: {
    marginRight: 3,
  },
  errorTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
