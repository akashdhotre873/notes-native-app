import { Text } from 'react-native';
import { getTimeFormat } from '../../dux/settings';
import { getTimeString } from '../../helpers/timeHelper';
import { getCalendars } from 'expo-localization';
import { useShallowEqualSelector } from '../../hooks/useShallowEqualSelector';

export const TimeDisplayComponent = ({ date }) => {
  const selectedTimeFormat = useShallowEqualSelector(getTimeFormat);
  const timeZone = getCalendars()[0].timeZone;
  const time = getTimeString(date, selectedTimeFormat, timeZone);

  return <Text>{time}</Text>;
};
