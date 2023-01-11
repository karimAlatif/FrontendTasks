import React from 'react';
import {User} from '../definitions/types/Users';

type State = {
  users: User[];
  activeUser: User | undefined;
  newUserId?: string;
  isAlertOpen: boolean;
  alertMsg: string;
  // setUsers: (users: User[]) => void;
  fetchUsers: () => void;
  setActiveUser: (user: User | undefined) => void;
  setNewUserId: (userId: string) => void;
  deleteUsers: (useresIds: string[]) => void;
  setIsAlertOpen: (state: boolean) => void;
  setAlertMsg: (alertMsg: string) => void;
};

const UseresContext = React.createContext<State>({
  users: [],
  activeUser: undefined,
  newUserId: '',
  isAlertOpen: false,
  alertMsg: '',
  // setUsers: (users: User[]) => {},
  fetchUsers: () => {},
  setActiveUser: (user: User | undefined) => {},
  setNewUserId: (userId: string) => {},
  deleteUsers: (useresIds: string[]) => {},
  setIsAlertOpen: (state: boolean) => {},
  setAlertMsg: (alertMsg: string) => {},
});
export default UseresContext;
