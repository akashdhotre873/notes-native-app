import AsyncStorage from "@react-native-async-storage/async-storage";

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
