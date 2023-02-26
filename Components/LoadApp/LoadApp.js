import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setNotes } from "../../dux/notes";
import {
  clearAsyncStorage,
  getItemFromAsyncStorage,
} from "../../helpers/asyncStorageHelper";

export const LoadApp = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // clearAsyncStorage();
    const getStorageData = async () => {
      const value = await getItemFromAsyncStorage("notes");
      const notes = value || {};
      dispatch(setNotes({ notes }));
    };
    getStorageData();
  }, []);

  return <></>;
};
