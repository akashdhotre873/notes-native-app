import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  HOME_SCREEN_PATH,
  NOTE_EDITOR_SCREEN_PATH,
  SETTINGS_SCREEN_PATH,
  TODO_EDITOR_SCREEN_PATH,
} from './helpers/pagePathHelper';
import { HomeScreen } from './screens/HomeScreen';
import { Provider, useSelector } from 'react-redux';
import store from './store/store';
import { LoadApp } from './components/LoadApp';
import { NoteEditorScreen } from './screens/NoteEditorScreen';
import { shouldShowPrompt } from './dux/prompt';
import { Promtps } from './components/shared/Prompts';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { colors } from './helpers/constants';
import { TodoEditorScreen } from './screens/TodoEditorScreen';
import { Provider as PaperProvider } from 'react-native-paper';
import { SettingsScreen } from './screens/SettingsScreen';

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
      <PaperProvider>
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
              <Stack.Screen
                name={TODO_EDITOR_SCREEN_PATH}
                component={TodoEditorScreen}
              />
              <Stack.Screen
                name={SETTINGS_SCREEN_PATH}
                component={SettingsScreen}
              />
            </Stack.Navigator>

            <OtherComponents />
          </NavigationContainer>
        </SafeAreaProvider>
      </PaperProvider>
    </Provider>
  );
}
