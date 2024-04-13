import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  HOME_SCREEN_PATH,
  NOTE_EDITOR_SCREEN_PATH,
  SETTINGS_SCREEN_PATH,
  TODO_EDITOR_SCREEN_PATH,
} from './helpers/pagePathHelper';
import { HomeScreen } from './screens/HomeScreen';
import { Provider } from 'react-redux';
import store from './store/store';
import { LoadApp } from './components/LoadApp';
import { NoteEditorScreen } from './screens/NoteEditorScreen';
import { shouldShowPrompt } from './dux/prompt';
import { Promtps } from './components/shared/Prompts';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TodoEditorScreen } from './screens/TodoEditorScreen';
import { Provider as PaperProvider } from 'react-native-paper';
import { SettingsScreen } from './screens/SettingsScreen';
import { ConfigProtectedLayout } from './components/ConfigProtectedLayout';
import { StatusBarContainer } from './components/StatusBarContainer';
import * as SplashScreen from 'expo-splash-screen';
import { useShallowEqualSelector } from './hooks/useShallowEqualSelector';

const Stack = createNativeStackNavigator();

const OtherComponents = () => {
  const showPrompt = useShallowEqualSelector(shouldShowPrompt);

  return <>{showPrompt && <Promtps />}</>;
};

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <LoadApp />
        <ConfigProtectedLayout>
          <SafeAreaProvider>
            <NavigationContainer>
              <StatusBarContainer />
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
        </ConfigProtectedLayout>
      </PaperProvider>
    </Provider>
  );
}
