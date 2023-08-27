import React from "react";
import { Alert, Share, Pressable } from "react-native";
import { dataType } from "../../helpers/constants";
import { formatNoteToShare } from "../../helpers/notesHelper";
import { formatTodoToShare } from "../../helpers/todosHelper";

export const ShareContentComponent = ({
  children,
  dataType: type,
  content,
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

  const onShare = async () => {
    try {
      await Share.share({
        message: contentToShare.message,
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return <Pressable onPress={onShare}>{children}</Pressable>;
};
