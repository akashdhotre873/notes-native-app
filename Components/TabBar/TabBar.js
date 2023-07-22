import * as React from "react";
import { Text, View, Pressable } from "react-native";
import { StyleSheet } from "react-native";
import { colors } from "../../helpers/constants";

export const TabBar = ({ state, descriptors, navigation, position }) => {
  return (
    <View style={{ flexDirection: "row" }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
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
            type: "tabLongPress",
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
            <Text
              style={[
                styles.label,
                isFocused ? styles.selectedLabel : styles.unselectedLabel,
              ]}
            >
              {label}
            </Text>
          </Pressable>
        );
      })}
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
  selectedLabelContainer: {
    borderBottomWidth: 2,
  },
  label: {
    alignSelf: "center",
    fontSize: 16,
  },
  selectedLabel: {},
  unselectedLabel: {
    opacity: 0.5,
  },
});
