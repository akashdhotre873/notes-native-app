import { getCalendars } from 'expo-localization';

import { getTimeFormat } from '../../dux/settings';
import { getTimeString } from '../../helpers/timeHelper';
import { useShallowEqualSelector } from '../../hooks/useShallowEqualSelector';
import { TextContainer } from '../TextContainer';

export const TimeDisplayComponent = ({ date }) => {
  const selectedTimeFormat = useShallowEqualSelector(getTimeFormat);
  const timeZone = getCalendars()[0].timeZone;
  const time = getTimeString(date, selectedTimeFormat, timeZone);

  return <TextContainer>{time}</TextContainer>;
};
