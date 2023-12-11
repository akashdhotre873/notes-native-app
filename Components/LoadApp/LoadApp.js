import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setNotes } from '../../dux/notes';
import { setTodos } from '../../dux/todos';
import {
  clearAsyncStorage,
  getItemFromAsyncStorage,
} from '../../helpers/asyncStorageHelper';
import {
  defaultSettings,
  defaultSortingInfo,
  promptCategoryType,
  warnings,
} from '../../helpers/constants';
import { showPrompt } from '../../dux/prompt';
import { setWarningsList } from '../../dux/warnings';
import { loadInitialSortInfo } from '../../dux/sort';
import { loadInitialSettings } from '../../dux/settings';

export const LoadApp = () => {
  const dispatch = useDispatch();
  const [firstAppLoadWarned, setFirstAppLoadWarned] = useState(true);

  useEffect(() => {
    // clearAsyncStorage();
    const loadNotes = async () => {
      const value = await getItemFromAsyncStorage('notes');
      const notes = value || {};
      dispatch(setNotes({ notes }));
    };

    const loadTodos = async () => {
      const value = await getItemFromAsyncStorage('todos');
      const todos = value || {};
      dispatch(setTodos({ todos }));
    };

    const loadWarnings = async () => {
      const value = await getItemFromAsyncStorage('warnings');
      const warningsList = value || [];
      dispatch(setWarningsList({ warningsList }));

      const firstAppLoadWarning =
        warningsList.find(
          (warning) => warning.name === warnings.FIRST_APP_LOAD_WARNING
        ) || {};
      const { warned } = firstAppLoadWarning;
      setFirstAppLoadWarned(warned);
    };

    const loadSortingInfo = async () => {
      const value = await getItemFromAsyncStorage('sortingInfo');
      const sortingInfo = value || defaultSortingInfo;
      dispatch(loadInitialSortInfo(sortingInfo));
    };

    const loadSettings = async () => {
      const value = await getItemFromAsyncStorage('settings');
      const settings = value || defaultSettings;
      dispatch(loadInitialSettings(settings));
    };

    loadSortingInfo();
    loadSettings();
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
