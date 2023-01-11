import {useCallback, useState, useEffect} from 'react';
import debounce from 'lodash.debounce';
import {User, UserData} from '../definitions/types/Users';
import {v4 as uuidv4} from 'uuid';

const InitUsers: User[] = [
  {
    customerId: uuidv4(),
    customerName: 'Karim mohamed',
    phone: '01112807901',
  },
];

const useUsersList = () => {
  const [users, setUsers] = useState<User[]>(InitUsers);
  const [activeUser, setActiveUser] = useState<User | undefined>();
  const [newUserId, setNewUserId] = useState<string>('');
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState<string>('');

  const fetchUsers = useCallback(() => {
    fetch(`http://localhost:8080/api/customers`)
      .then(res => res.json())
      .then(data => {
        console.log('users =====>>', data);
        setUsers(data.content);
      });
  }, []);

  const deleteUsers = useCallback(
    (usersIds: string[]) => {
      console.log('users', usersIds);

      fetch(`http://localhost:8080/api/customers?customerID=${usersIds[0]}`, {
        method: 'DELETE',
      }).then(() => {
        setAlertMsg('Delete has been done successfully.');
        fetchUsers();
        setIsAlertOpen(true);
      });
    },
    [fetchUsers],
  );

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    users,
    activeUser,
    newUserId,
    isAlertOpen,
    alertMsg,
    setAlertMsg,
    setIsAlertOpen,
    // setUsers,
    fetchUsers,
    setActiveUser,
    setNewUserId,
    deleteUsers,
  };
};

export default useUsersList;
