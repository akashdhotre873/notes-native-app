import { StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { hidePrompt } from '../../dux/prompt';
import { Button, Modal } from 'react-native-paper';
import { useEffect, useState } from 'react';
import { useRef } from 'react';
import { getWarnings } from '../../dux/warnings';
import { updateWarningsInAsyncStorage } from '../../helpers/warningsHelper';
import { warnings } from '../../helpers/constants';
import { useShallowEqualSelector } from '../../hooks/useShallowEqualSelector';

export const FirstAppLoadWarning = () => {
  const dispatch = useDispatch();
  const warningsList = useShallowEqualSelector(getWarnings);

  const [remainingTime, setRemainingTime] = useState(15); // 15 seconds
  const [onConfirmButtonEnabled, setOnConfirmButtonEnabled] = useState(false);
  const intervalRef = useRef();

  const closeHandler = () => {
    dispatch(hidePrompt());
  };

  const onConfirm = () => {
    updateWarningsInAsyncStorage({
      warningsList,
      warningName: warnings.FIRST_APP_LOAD_WARNING,
      warned: true,
    });
    closeHandler();
  };

  useEffect(() => {
    const ONE_SECOND = 1000;
    const fun = () => {
      setRemainingTime((remainingTime) => remainingTime - 1);
    };

    intervalRef.current = setInterval(fun, ONE_SECOND);
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (remainingTime <= 0) {
      setOnConfirmButtonEnabled(true);
      clearInterval(intervalRef.current);
    }
  }, [remainingTime]);

  const highLight = (string) => {
    return <Text style={styles.highLight}>{string}</Text>;
  };

  return (
    <Modal
      visible={true}
      contentContainerStyle={styles.modal}
      style={{ marginTop: 0 }}
      dismissable={false}
    >
      <View>
        <Text style={styles.header}>Attention!</Text>
        <Text style={styles.smallHelperText}>(Please read carefully)</Text>

        <View style={styles.warningPointsContainer}>
          <Text style={styles.warningPointsHeader}>
            This Note App stores data in Async Storage of the app. The app
            {highLight(' does not ')}
            take backup as there are no servers used. So please keep in mind
            these points before you use the app
          </Text>

          <Text style={styles.warningPoint}>
            {`\u2022`} If you {highLight('uninstall')} the app, data will be
            {highLight(' lost forever')}.
          </Text>
          <Text style={styles.warningPoint}>
            {`\u2022`} If you {highLight('clear the app data')}, data will be
            {highLight(' lost forever')}.
          </Text>
          <Text style={styles.warningPoint}>
            {`\u2022`} If you choose to protect your notes or todos with
            password and {highLight('forget the password')}, there is no way to
            reset the password. So if you can't remember the password,
            {highLight(" you can't retrieve your notes or todos")}.
          </Text>
        </View>

        {remainingTime > 0 && (
          <Text style={styles.infoText}>
            You can close this pop-up in {highLight(remainingTime)} seconds.
          </Text>
        )}

        <View style={styles.buttonsContainer}>
          <Button
            mode="text"
            onPress={onConfirm}
            textColor="red"
            disabled={!onConfirmButtonEnabled}
          >
            Close
          </Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: '#ffffff',
    top: '-5%',
    width: '90%',
    alignSelf: 'center',
    elevation: 10,
    borderRadius: 5,
  },
  header: {
    paddingTop: 25,
    paddingLeft: 25,
    fontSize: 18,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontWeight: '500',
    color: 'red',
  },
  smallHelperText: {
    marginTop: 2,
    paddingLeft: 25,
    fontSize: 12,
    color: 'red',
  },
  content: {
    backgroundColor: '#ffffff',
    marginHorizontal: 25,
    marginBottom: 10,
    marginTop: 10,
  },
  warningPointsContainer: {
    paddingTop: 10,
    paddingHorizontal: 25,
  },
  warningPointsHeader: {
    color: 'blue',
    paddingBottom: 5,
  },
  warningPoint: {
    paddingTop: 5,
  },
  infoText: {
    paddingTop: 15,
    paddingHorizontal: 25,
    color: 'blue',
  },
  highLight: {
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  buttonsContainer: {
    flexDirection: 'row-reverse',
    marginVertical: 15,
    marginLeft: 20,
  },
});
