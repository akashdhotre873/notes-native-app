import { useSelector } from 'react-redux';
import { getIsAppInfoLoaded } from '../../dux/appInfo';

export const AppInfoProtectedLayout = ({ children }) => {
  const isAppInfoLoaded = useSelector(getIsAppInfoLoaded);

  if (!isAppInfoLoaded) {
    return null;
  }

  return children;
};
