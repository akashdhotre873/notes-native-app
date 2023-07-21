import { NotesHomeScreen } from "../NotesHomeScreen";
import { TodosHomeScreen } from "../TodosHomeScreen";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { colors } from "../../helpers/constants";
import { TabBar } from "../../components/TabBar";

const Tab = createMaterialTopTabNavigator();

export const HomeScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.primaryColor,
        },
        tabBarLabelStyle: { fontSize: 16 },

        tabBarIndicatorStyle: { backgroundColor: "yellow" },
      }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tab.Screen name="Notes" component={NotesHomeScreen} />
      <Tab.Screen name="Todos" component={TodosHomeScreen} />
    </Tab.Navigator>
  );
};
