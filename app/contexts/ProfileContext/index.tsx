import decode from 'jwt-decode';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Role } from '../../types/Role';

const ID_TOKEN_KEY = 'id_token';

interface Payload {
  sub: string;
  'cognito:groups'?: Role[];
  exp: number;
}

interface ProfileState {
  activeRole: Role;
  setActiveRole: (role: Role) => void;
  availableRoles: Role[];
  isLoggedIn: boolean;
  login: (token: string) => boolean;
  logout: () => void;
  loadUser: (payload: Payload) => void;
}

const defaultProfileState: ProfileState = {
  activeRole: Role.public,
  setActiveRole: () => null,
  availableRoles: [Role.public],
  isLoggedIn: false,
  login: () => false,
  logout: () => null,
  loadUser: () => null,
}

function useProfileState(): ProfileState {
  const [activeRole, setActiveRole] = useState(defaultProfileState.activeRole);
  const [availableRoles, setAvailableRoles] = useState(defaultProfileState.availableRoles);

  function logout() {
    localStorage.removeItem(ID_TOKEN_KEY);
    setAvailableRoles(defaultProfileState.availableRoles);
    setActiveRole(defaultProfileState.activeRole);
  }

  function login(token: string) {
    try {
      const payload = decode(token) as Payload;
      if (new Date(payload.exp * 1000) < new Date()) {
        logout();
        return false;
      } else {
        localStorage.setItem(ID_TOKEN_KEY, token);
        loadUser(payload);
        return true;
      }
    } catch (e) {
      logout();
      return false;
    }
  }

  function loadUser(payload: Payload) {
    setActiveRole(Role.user);
    // Cognito automatically creates groups for google oauth users
    const otherGroups = (payload['cognito:groups'] || []).filter((role) => Object.values(Role).includes(role));
    setAvailableRoles([Role.public, Role.user, ...otherGroups])
  }

  useEffect(() => {
    const token = localStorage.getItem(ID_TOKEN_KEY);
    if (token) {
      login(token);
    }
  }, [])

  return useMemo(() => ({
    activeRole,
    setActiveRole,
    availableRoles,
    isLoggedIn: availableRoles.length > 1,
    login,
    logout,
    loadUser,
  }), [activeRole]);
}

const ProfileContext = React.createContext<ProfileState>(defaultProfileState);

export const ProfileProvider: React.FC = ({ children }) => {
  const value = useProfileState();
  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
}

export function useProfile() {
  return useContext(ProfileContext);
}