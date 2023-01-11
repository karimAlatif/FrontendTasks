import React, {lazy} from 'react';
import Routes from './routes';
import languages from './definitions/translations/en.json';
import {BrowserRouter, Router} from 'react-router-dom';
import i18n from 'i18n';
import useUsersList from './actions/useUserList';
import UseresContext from './context/usersContext';

i18n.addResourceBundle('en', 'translation', languages, true);

function Users() {
  const {
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
  } = useUsersList();

  return (
    <>
      <UseresContext.Provider
        value={{
          users,
          activeUser,
          newUserId,
          isAlertOpen,
          alertMsg,
          setAlertMsg,
          setIsAlertOpen,
          fetchUsers,
          setActiveUser,
          setNewUserId,
          deleteUsers,
        }}
      >
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </UseresContext.Provider>
    </>
  );
}

export default Users;
