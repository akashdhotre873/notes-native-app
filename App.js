import { StyleSheet, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  HOME_SCREEN_PATH,
  NOTE_EDITOR_SCREEN_PATH,
} from "./helpers/pagePathHelper";
import { HomeScreen } from "./screens/HomeScreen";
import { Provider, useSelector } from "react-redux";
import store from "./store/store";
import { LoadApp } from "./components/LoadApp";
import { NoteEditorScreen } from "./screens/NoteEditorScreen";
import { shouldShowPrompt } from "./dux/prompt";
import { Promtps } from "./components/shared/Prompts";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { colors } from "./helpers/constants";

const Stack = createNativeStackNavigator();

const OtherComponents = () => {
  const showPrompt = useSelector(shouldShowPrompt);
  return (
    <>
      <LoadApp />
      {showPrompt && <Promtps />}
    </>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar
            backgroundColor={colors.primaryColor}
            barStyle="dark-content"
          />
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={HOME_SCREEN_PATH} component={HomeScreen} />
            <Stack.Screen
              name={NOTE_EDITOR_SCREEN_PATH}
              component={NoteEditorScreen}
            />
          </Stack.Navigator>
          <OtherComponents />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({});
