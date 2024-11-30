import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import {
  Provider as PaperProvider,
  MD3LightTheme as DefaultTheme,
  MD3DarkTheme as DarkTheme,
} from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

import { ConfigProtectedLayout } from './components/ConfigProtectedLayout';
import { LoadApp } from './components/LoadApp';
import { StatusBarContainer } from './components/StatusBarContainer';
import { Promtps } from './components/shared/Prompts';
import { shouldShowPrompt } from './dux/prompt';
import { getColorScheme } from './dux/settings';
import { colorSchemes } from './helpers/constants';
import {
  HOME_SCREEN_PATH,
  NOTE_EDITOR_SCREEN_PATH,
  SETTINGS_SCREEN_PATH,
  TODO_EDITOR_SCREEN_PATH,
} from './helpers/pagePathHelper';
import { useShallowEqualSelector } from './hooks/useShallowEqualSelector';
import { HomeScreen } from './screens/HomeScreen';
import { NoteEditorScreen } from './screens/NoteEditorScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { TodoEditorScreen } from './screens/TodoEditorScreen';
import store from './store/store';

const Stack = createNativeStackNavigator();

const OtherComponents = () => {
  const showPrompt = useShallowEqualSelector(shouldShowPrompt);

  return <>{showPrompt && <Promtps />}</>;
};

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const StoreContainer = () => {
  const colorScheme = useShallowEqualSelector(getColorScheme);
  const theme = colorSchemes.DARK === colorScheme ? DarkTheme : DefaultTheme;
  return (
    <PaperProvider theme={theme}>
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
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <StoreContainer />
    </Provider>
  );
}
