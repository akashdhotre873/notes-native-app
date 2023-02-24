import { StyleSheet, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  HOME_SCREEN_PATH,
  NOTE_EDITOR_SCREEN_PATH,
} from "./helpers/pagePathHelper";
import { HomeScreen } from "./screens/HomeScreen";
import { Provider } from "react-redux";
import store from "./store/store";
import { LoadApp } from "./components/LoadApp";
import { NoteEditorScreen } from "./screens/NoteEditorScreen";

const Stack = createNativeStackNavigator();

const OtherComponents = () => {
  return <LoadApp />;
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar backgroundColor="lightblue" barStyle="dark-content" />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name={HOME_SCREEN_PATH} component={HomeScreen} />
          <Stack.Screen
            name={NOTE_EDITOR_SCREEN_PATH}
            component={NoteEditorScreen}
          />
        </Stack.Navigator>
        <OtherComponents />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({});
