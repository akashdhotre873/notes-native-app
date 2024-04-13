import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { getSelectedTab, setSelectedTab } from '../../dux/tabs';
import { tabs } from '../../helpers/constants';
import { getColors } from '../../dux/settings';
import { useShallowEqualSelector } from '../../hooks/useShallowEqualSelector';

export const Tabs = () => {
  const dispatch = useDispatch();
  const selectedTab = useShallowEqualSelector(getSelectedTab);
  const { primaryColor } = useShallowEqualSelector(getColors);

  const onPress = (tabName) => {
    dispatch(setSelectedTab(tabName));
  };

  return (
    <View style={[styles.container, { backgroundColor: primaryColor }]}>
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
    paddingVertical: 5,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  tab: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 18,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.7,
  },
  selectedTab: {
    fontWeight: '700',
    opacity: 1,
  },
});
