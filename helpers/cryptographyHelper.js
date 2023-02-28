import CryptoJS from "crypto-js";
import "react-native-get-random-values";
import { v4 as uuid4 } from "uuid";

export const getCipherText = (plainText, key) => {
  return CryptoJS.AES.encrypt(plainText, key).toString();
};

export const getPlainText = (cipherText, key) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, key);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export const getHash = (message, salt) => {
  return CryptoJS.SHA256(message + salt).toString();
};

export const getUUID = () => {
  return uuid4();
};
