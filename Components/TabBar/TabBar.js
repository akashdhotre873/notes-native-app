import * as React from 'react';
import { Text, View, Pressable } from 'react-native';
import { StyleSheet } from 'react-native';
import { colors } from '../../helpers/constants';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SETTINGS_SCREEN_PATH } from '../../helpers/pagePathHelper';

export const TabBar = ({ state, descriptors, navigation }) => {
  const stackNavigation = useNavigation();
  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const TabBarBadge = options.tabBarBadge;
        const tabBarBadgeIsPresent = Boolean(options.tabBarBadge);
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <Pressable
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[
              styles.labelContainer,
              isFocused ? styles.selectedLabelContainer : {},
            ]}
            key={route.key}
          >
            {tabBarBadgeIsPresent ? (
              <TabBarBadge style={styles.icon} isFocused={isFocused} />
            ) : (
              <Text
                style={[
                  styles.label,
                  isFocused ? styles.selectedLabel : styles.unselectedLabel,
                ]}
              >
                {label}
              </Text>
            )}
          </Pressable>
        );
      })}

      <Pressable
        onPress={() => stackNavigation.navigate(SETTINGS_SCREEN_PATH)}
        hitSlop={{ top: 20, bottom: 10, right: 10, left: 30 }}
      >
        <Ionicons
          name="settings"
          size={24}
          color="black"
          style={styles.settingsIcon}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  labelContainer: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: colors.primaryColor,
  },
  some: {
    flex: 0.3,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: colors.primaryColor,
  },
  selectedLabelContainer: {},
  icon: {
    alignSelf: 'center',
  },
  label: {
    alignSelf: 'center',
    fontSize: 16,
  },
  selectedLabel: {
    fontWeight: 'bold',
  },
  unselectedLabel: {
    opacity: 0.5,
  },
  settingsIcon: {
    position: 'absolute',
    right: 15,
    top: 10,
    paddingLeft: 10,
  },
});
