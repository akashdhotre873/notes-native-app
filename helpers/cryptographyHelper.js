import CryptoJS from "crypto-js";

export const getCipherText = (plainText, key) => {
  return CryptoJS.AES.encrypt(plainText, key).toString();
};

export const getPlainText = (cipherText, key) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, key);
  return bytes.toString(CryptoJS.enc.Utf8);
};
