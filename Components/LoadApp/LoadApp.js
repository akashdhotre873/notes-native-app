import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { setIsAppLoaded } from '../../dux/appInfo';
import { setNotes } from '../../dux/notes';
import { showPrompt } from '../../dux/prompt';
import { loadInitialSettings } from '../../dux/settings';
import { loadInitialSortInfo } from '../../dux/sort';
import { setTodos } from '../../dux/todos';
import { setWarningsList } from '../../dux/warnings';
import { getItemFromAsyncStorage } from '../../helpers/asyncStorageHelper';
import {
  defaultSettings,
  defaultSortingInfo,
  promptCategoryType,
  warnings,
} from '../../helpers/constants';

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
      const { warned = false } = firstAppLoadWarning;
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

    const loadEverything = async () => {
      const promises = [
        loadSortingInfo(),
        loadSettings(),
        loadNotes(),
        loadTodos(),
        loadWarnings(),
      ];
      await Promise.all(promises);
      dispatch(setIsAppLoaded(true));
      SplashScreen.hideAsync();
    };

    loadEverything();
  }, [dispatch]);

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
