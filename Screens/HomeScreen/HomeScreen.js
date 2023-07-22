import { NotesHomeScreen } from "../NotesHomeScreen";
import { TodosHomeScreen } from "../TodosHomeScreen";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { TabBar } from "../../components/TabBar";

const Tab = createMaterialTopTabNavigator();

export const HomeScreen = () => {
  return (
    <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
      <Tab.Screen name="Notes" component={NotesHomeScreen} />
      <Tab.Screen name="Todos" component={TodosHomeScreen} />
    </Tab.Navigator>
  );
};
