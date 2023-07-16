import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setNotes } from "../../dux/notes";
import { setTodos } from "../../dux/todos";
import {
  clearAsyncStorage,
  getItemFromAsyncStorage,
} from "../../helpers/asyncStorageHelper";

export const LoadApp = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // clearAsyncStorage();
    const loadNotes = async () => {
      const value = await getItemFromAsyncStorage("notes");
      const notes = value || {};
      dispatch(setNotes({ notes }));
    };

    const loadTodos = async () => {
      const value = await getItemFromAsyncStorage("todos");
      const todos = value || {};
      dispatch(setTodos({ todos }));
    };
    loadNotes();
    loadTodos();
  }, []);

  return <></>;
};
