import { StatusBar } from 'react-native';
import { useSelector } from 'react-redux';
import { getColors } from '../../dux/settings';

export const StatusBarContainer = () => {
  const { primaryColor } = useSelector(getColors);

  return <StatusBar backgroundColor={primaryColor} barStyle="dark-content" />;
};
