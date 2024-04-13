import { getIsAppInfoLoaded } from '../../dux/appInfo';
import { useShallowEqualSelector } from '../../hooks/useShallowEqualSelector';

export const ConfigProtectedLayout = ({ children }) => {
  const isAppInfoLoaded = useShallowEqualSelector(getIsAppInfoLoaded);

  if (!isAppInfoLoaded) {
    return null;
  }

  return children;
};
