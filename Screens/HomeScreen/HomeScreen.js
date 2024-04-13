import { Ionicons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StyleSheet } from 'react-native';

import { TabBar } from '../../components/TabBar';
import { getColors } from '../../dux/settings';
import { useShallowEqualSelector } from '../../hooks/useShallowEqualSelector';
import { NotesHomeScreen } from '../NotesHomeScreen';
import { TodosHomeScreen } from '../TodosHomeScreen';

const Tab = createMaterialTopTabNavigator();

export const HomeScreen = () => {
  const { iconPrimaryColor } = useShallowEqualSelector(getColors);

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
              color={iconPrimaryColor}
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
              color={iconPrimaryColor}
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
