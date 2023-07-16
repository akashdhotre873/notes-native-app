import { Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedTab, setSelectedTab } from "../../dux/tabs";
import { colors, tabs } from "../../helpers/constants";

export const Tabs = () => {
  const dispatch = useDispatch();
  const selectedTab = useSelector(getSelectedTab);

  const onPress = (tabName) => {
    dispatch(setSelectedTab(tabName));
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabsContainer}>
        {tabs.map(({ name: tabName, value: tabValue }) => {
          return (
            <Pressable key={tabValue} onPress={() => onPress(tabValue)}>
              <Text
                style={[
                  styles.tab,
                  selectedTab === tabValue ? styles.selectedTab : {},
                ]}
              >
                {tabName}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primaryColor,
    paddingVertical: 5,
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  tab: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 18,
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.7,
  },
  selectedTab: {
    fontWeight: "700",
    opacity: 1,
  },
});
