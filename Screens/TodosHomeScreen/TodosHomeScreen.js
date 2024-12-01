import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, ScrollView, BackHandler } from 'react-native';
import { useDispatch } from 'react-redux';

import { ActionBar } from '../../components/ActionBar';
import { NewContent } from '../../components/NewContent';
import { TodoListCard } from '../../components/TodoListCard';
import { showPrompt } from '../../dux/prompt';
import { getSortInfoFor } from '../../dux/sort';
import { getTodos } from '../../dux/todos';
import { dataType, promptCategoryType } from '../../helpers/constants';
import { getUUID } from '../../helpers/cryptographyHelper';
import { TODO_EDITOR_SCREEN_PATH } from '../../helpers/pagePathHelper';
import { sortTodos } from '../../helpers/sortHelper';
import { useShallowEqualSelector } from '../../hooks/useShallowEqualSelector';
import { getColors } from '../../dux/settings';

export const TodosHomeScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const todos = useShallowEqualSelector(getTodos);
  const { backgroundColor } = useShallowEqualSelector(getColors);
  const { selectedSortParameter, selectedSortOrder } = useShallowEqualSelector(
    getSortInfoFor(dataType.TODO)
  );

  const [searchValue, setSearchValue] = useState('');
  const [selectedTodoName, setSelectedTodoName] = useState('');

  const sortAlgo = (todoFirst, todoSecond) => {
    return sortTodos(
      todoFirst,
      todoSecond,
      selectedSortParameter,
      selectedSortOrder
    );
  };

  const onDelete = () => {
    dispatch(
      showPrompt({
        category: promptCategoryType.DELETE_TODO_PROMPT,
        data: { todoName: selectedTodoName, shouldGoBack: false },
      })
    );
    setSelectedTodoName('');
  };

  useEffect(() => {
    return () => setSelectedTodoName('');
  }, [isFocused]);

  const backAction = useCallback(() => {
    if (!selectedTodoName) {
      const canExit = false;
      return canExit;
    }
    setSelectedTodoName('');
    const canNotExit = true;
    return canNotExit;
  }, [selectedTodoName]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [selectedTodoName, backAction]);

  const onSearchValueChange = (newValue) => {
    setSearchValue(newValue);
    setSelectedTodoName('');
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <ActionBar
        title="All Todos"
        onDelete={selectedTodoName ? onDelete : null}
        sortItem={dataType.TODO}
        searchValue={searchValue}
        onSearchValueChange={onSearchValueChange}
      />
      <ScrollView
        style={styles.cardsContainer}
        keyboardShouldPersistTaps="handled"
      >
        {Object.values(todos)
          .sort(sortAlgo)
          .map((todo) => (
            <TodoListCard
              todo={todo}
              key={todo.name + getUUID()}
              selectedTodoName={selectedTodoName}
              setSelectedTodoName={setSelectedTodoName}
              searchValue={searchValue}
            />
          ))}
      </ScrollView>
      <NewContent
        iconOnClick={() =>
          navigation.navigate(TODO_EDITOR_SCREEN_PATH, { newTodo: true })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  cardsContainer: {
    marginTop: 5,
    flex: 1,
  },
});
