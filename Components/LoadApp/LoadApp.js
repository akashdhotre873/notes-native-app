import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setNotes } from "../../dux/notes";
import { setTodos } from "../../dux/todos";
import {
  clearAsyncStorage,
  getItemFromAsyncStorage,
} from "../../helpers/asyncStorageHelper";
import { promptCategoryType, warnings } from "../../helpers/constants";
import { showPrompt } from "../../dux/prompt";
import { setWarningsList } from "../../dux/warnings";

export const LoadApp = () => {
  const dispatch = useDispatch();
  const [firstAppLoadWarned, setFirstAppLoadWarned] = useState(true);

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

    const loadWarnings = async () => {
      const value = await getItemFromAsyncStorage("warnings");
      const warningsList = value || [];
      dispatch(setWarningsList({ warningsList }));

      const firstAppLoadWarning =
        warningsList.find(
          (warning) => warning.name === warnings.FIRST_APP_LOAD_WARNING
        ) || {};
      const { warned } = firstAppLoadWarning;
      setFirstAppLoadWarned(warned);
    };

    loadNotes();
    loadTodos();
    loadWarnings();
  }, []);

  useEffect(() => {
    if (!firstAppLoadWarned) {
      dispatch(
        showPrompt({
          category: promptCategoryType.FIRST_APP_LOAD_WARNING_PROMPT,
        })
      );
    }
  }, [dispatch, firstAppLoadWarned]);

  return <></>;
};
