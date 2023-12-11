import { setItemToAsyncStorage } from './asyncStorageHelper';

export const updateAndSaveSettingsToAsyncStorage = ({
  settings,
  settingType,
  value,
}) => {
  settings[settingType] = value;
  setItemToAsyncStorage('settings', JSON.stringify(settings));
};
