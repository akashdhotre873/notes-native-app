import { Text } from 'react-native';
import { useSelector } from 'react-redux';
import { getTimeFormat } from '../../dux/settings';
import { getTimeString } from '../../helpers/timeHelper';

export const TimeDisplayComponent = ({ date }) => {
  const selectedTimeFormat = useSelector(getTimeFormat);
  const time = getTimeString(date, selectedTimeFormat);

  return <Text>{time}</Text>;
};
