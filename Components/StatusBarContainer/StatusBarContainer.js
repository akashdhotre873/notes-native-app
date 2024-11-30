import { StatusBar } from 'react-native';
import { useSelector } from 'react-redux';

import { getColors, getColorScheme } from '../../dux/settings';
import { colorSchemes } from '../../helpers/constants';
import { useShallowEqualSelector } from '../../hooks/useShallowEqualSelector';

export const StatusBarContainer = () => {
  const { primaryColor } = useShallowEqualSelector(getColors);
  const colorScheme = useSelector(getColorScheme);

  const getBarStyle = () => {
    if (colorScheme === colorSchemes.DARK) {
      return 'light-content';
    }
    return 'dark-content';
  };

  return <StatusBar backgroundColor={primaryColor} barStyle={getBarStyle()} />;
};
