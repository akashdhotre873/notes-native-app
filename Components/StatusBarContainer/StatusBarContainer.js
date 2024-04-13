import { StatusBar } from 'react-native';
import { getColors } from '../../dux/settings';
import { useShallowEqualSelector } from '../../hooks/useShallowEqualSelector';

export const StatusBarContainer = () => {
  const { primaryColor } = useShallowEqualSelector(getColors);

  return <StatusBar backgroundColor={primaryColor} barStyle="dark-content" />;
};
