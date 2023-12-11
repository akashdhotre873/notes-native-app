import { Text } from 'react-native';
import { useSelector } from 'react-redux';
import { getTimeFormat } from '../../dux/settings';
import { getTimeString } from '../../helpers/timeHelper';
import { getCalendars } from 'expo-localization';

export const TimeDisplayComponent = ({ date }) => {
  const selectedTimeFormat = useSelector(getTimeFormat);
  const timeZone = getCalendars()[0].timeZone;
  const time = getTimeString(date, selectedTimeFormat, timeZone);

  return <Text>{time}</Text>;
};
