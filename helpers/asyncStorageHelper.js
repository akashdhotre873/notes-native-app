import AsyncStorage from '@react-native-async-storage/async-storage';

export const getItemFromAsyncStorage = async (key) => {
  const jsonValue = await AsyncStorage.getItem(key);
  return jsonValue ? JSON.parse(jsonValue) : jsonValue;
};

export const setItemToAsyncStorage = async (key, value) => {
  await AsyncStorage.setItem(key, value);
};

export const clearAsyncStorage = () => {
  AsyncStorage.clear();
};

export const getItemsFromAsyncStorage = async () => {
  const keys = await AsyncStorage.getAllKeys();
  const stringifiedValue = await AsyncStorage.multiGet(keys);

  const values = stringifiedValue.map((v) => JSON.parse(v[1]));
  console.log(values);
};
