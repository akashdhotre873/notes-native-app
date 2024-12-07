import { StatusBar } from 'react-native';

import { getColors } from '../../dux/settings';
import { themeColors } from '../../helpers/constants';
import { useShallowEqualSelector } from '../../hooks/useShallowEqualSelector';

export const StatusBarContainer = () => {
  const { primaryColor, themeColor } = useShallowEqualSelector(getColors);
  const barStyle =
    themeColor === themeColors.DARK ? 'light-content' : 'dark-content';

  return <StatusBar backgroundColor={primaryColor} barStyle={barStyle} />;
};
