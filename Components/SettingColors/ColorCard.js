import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Divider, TextInput } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { recognizedColors } from '../../helpers/constants';
import { useDispatch } from 'react-redux';
import { updateColor } from '../../dux/settings';

const ColorBox = ({ color, style = {} }) => (
  <View style={[styles.colorBox, { backgroundColor: color }, style]} />
);

export const ColorCard = ({ text, color, colorType }) => {
  const dispatch = useDispatch();
  const [colorValue, setColorValue] = useState(color);
  const [editing, setEditing] = useState(false);
  const defaultSelection = {
    start: 0,
    end: color.length,
  };
  const [selection, setSelection] = useState(defaultSelection);

  const onSave = () => {
    setEditing(false);
    dispatch(updateColor({ color: colorValue, colorType }));
  };

  const onCancel = () => {
    setEditing(false);
    setColorValue(color);
    setSelection(defaultSelection);
  };

  const onChange = (newValue) => {
    setColorValue(newValue.toLowerCase());
  };

  const regex = /(^#[a-f0-9]{3}$)|(^#[a-f0-9]{6}$)/;
  const isValidColor =
    regex.test(colorValue) || recognizedColors.includes(colorValue);

  return (
    <View style={styles.container}>
      <View style={styles.colorContainer}>
        <Text style={styles.text}>{text}</Text>
        <View style={styles.colorValueContainer}>
          {isValidColor && <ColorBox color={editing ? colorValue : color} />}
          {!editing && (
            <>
              <Text style={styles.colorText}>{color}</Text>
              <Feather
                name="edit-2"
                size={16}
                color="black"
                style={styles.editIcon}
                onPress={() => setEditing(true)}
              />
            </>
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
            selection={selection}
            onFocus={() => setSelection(null)}
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
              <Text style={styles.buttonText}>Cancel</Text>
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
              <Text style={styles.buttonText}>Save</Text>
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
    // margin: 10,
    paddingVertical: 6,
    borderRadius: 5,
    // elevation: 5,
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
    // flexGrow: 1,
  },
});
