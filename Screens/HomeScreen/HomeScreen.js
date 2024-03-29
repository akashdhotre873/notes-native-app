import { NotesHomeScreen } from '../NotesHomeScreen';
import { TodosHomeScreen } from '../TodosHomeScreen';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { TabBar } from '../../components/TabBar';
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Tab = createMaterialTopTabNavigator();

export const HomeScreen = () => {
  return (
    <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
      <Tab.Screen
        name="Notes"
        component={NotesHomeScreen}
        options={{
          tabBarBadge: (props) => (
            <Ionicons
              {...props}
              name={props.isFocused ? 'document-text' : 'document-text-outline'}
              size={24}
              color="black"
              style={[props.style, styles.noteIcon]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Todos"
        component={TodosHomeScreen}
        options={{
          tabBarBadge: (props) => (
            <Ionicons
              {...props}
              size={24}
              name={props.isFocused ? 'checkbox' : 'checkbox-outline'}
              color="black"
              style={[props.style, styles.todoIcon]}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  noteIcon: {
    alignSelf: 'flex-end',
    paddingRight: 25,
  },
  todoIcon: {
    alignSelf: 'flex-start',
    paddingLeft: 25,
  },
});
