import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { StyleSheet, View, ScrollView, BackHandler } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ActionBar } from '../../components/ActionBar';
import { TodoListCard } from '../../components/TodoListCard';
import { showPrompt } from '../../dux/prompt';
import { getTodos } from '../../dux/todos';
import { dataType, promptCategoryType } from '../../helpers/constants';
import { TODO_EDITOR_SCREEN_PATH } from '../../helpers/pagePathHelper';
import { useEffect } from 'react';
import { getUUID } from '../../helpers/cryptographyHelper';
import { getSortInfoFor } from '../../dux/sort';
import { sortTodos } from '../../helpers/sortHelper';
import { NewContent } from '../../components/NewContent';

export const TodosHomeScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const todos = useSelector(getTodos);
  const { selectedSortParameter, selectedSortOrder } = useSelector(
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

  const backAction = () => {
    if (!selectedTodoName) {
      const canExit = false;
      return canExit;
    }
    setSelectedTodoName('');
    const canNotExit = true;
    return canNotExit;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [selectedTodoName]);

  const onSearchValueChange = (newValue) => {
    setSearchValue(newValue);
    setSelectedTodoName('');
  };

  return (
    <View style={styles.container}>
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
    backgroundColor: '#f8f8f3',
    marginTop: 5,
    flex: 1,
  },
});
