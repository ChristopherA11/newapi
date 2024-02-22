import { useMemo } from 'react';
import { useSelector } from 'react-redux';

export const useDisableSolutionEdit = () => {
  const currentUser = useSelector((store) => store.currentUser);

  const role = useMemo(() => {
    return _.get(currentUser, 'launchpad_user.role');
  }, [currentUser]);

  return canDisableSolutionEditAccess(role);
};

export const canDisableSolutionEditAccess = (role) => {
  return role === 'admin';
};

