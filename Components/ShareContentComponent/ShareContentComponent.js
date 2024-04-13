import * as Clipboard from "expo-clipboard";
import React from "react";
import { Alert, Share, Pressable, ToastAndroid } from "react-native";

import { dataType, shareMethod } from "../../helpers/constants";
import { formatNoteToShare } from "../../helpers/notesHelper";
import { formatTodoToShare } from "../../helpers/todosHelper";

export const ShareContentComponent = ({
  children,
  dataType: type,
  content,
  shareType,
  callBack = () => {},
}) => {
  const contentToShare = {
    title: "", // is not used
    message: "",
  };
  if (type === dataType.NOTE) {
    contentToShare.message = formatNoteToShare(content);
  }
  if (type === dataType.TODO) {
    contentToShare.message = formatTodoToShare(content);
  }

  const openExternalDialogAndShareContent = async () => {
    try {
      await Share.share({
        message: contentToShare.message,
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const copyToClipBoard = async () => {
    const toastMessage = "Copied to clipboard!";
    ToastAndroid.show(toastMessage, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
    await Clipboard.setStringAsync(contentToShare.message);
  };

  const onShare = () => {
    callBack();
    if (shareType === shareMethod.EXTERANL_DIALOG) {
      openExternalDialogAndShareContent();
      return;
    }
    if (shareType === shareMethod.CLIPBOARD) {
      copyToClipBoard();
      
    }
  };

  return <Pressable onPress={onShare}>{children}</Pressable>;
};
