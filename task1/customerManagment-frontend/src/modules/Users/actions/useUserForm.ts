import {useCallback, useContext, useEffect, useRef, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {User, UserData} from '../definitions/types/index';
import {useFormContext} from 'react-hook-form';
import UseresContext from '../context/usersContext';
import {injectParamsIntoUrl} from 'shared/utils';
import {v4 as uuidv4} from 'uuid';

const useUserForm = () => {
  const {t} = useTranslation();
  const {
    users,
    activeUser,
    newUserId,
    isAlertOpen,
    alertMsg,
    setIsAlertOpen,
    setAlertMsg,
    fetchUsers,
  } = useContext(UseresContext);

  const form = useFormContext<UserData>();
  const {setValue, watch, handleSubmit, reset} = form;
  const {customerName} = watch();
  //
  const history = useHistory();

  const createUser = useCallback(
    handleSubmit((userData: UserData) => {
      console.log('userData  ', userData);

      const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({customerId: `${Math.floor(Math.random() * 100000)}`, ...userData}),
      };
      fetch('http://localhost:8080/api/customers', requestOptions)
        .then(response => response.json())
        .then(data => {
          setAlertMsg('User has been created successfully.');
          setIsAlertOpen(true);
          history.push(injectParamsIntoUrl('/', {}));
          fetchUsers();
        });
    }),
    [users],
  );

  const editUser = useCallback(
    handleSubmit((userData: UserData) => {
      console.log('userData  ', userData);

      const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({customerId: activeUser?.customerId || '', ...userData}),
      };
      fetch('http://localhost:8080/api/customers', requestOptions)
        .then(response => response.json())
        .then(data => {
          setAlertMsg('User has been edited successfully.');
          setIsAlertOpen(true);
          history.push(injectParamsIntoUrl('/', {}));
          fetchUsers();
        });

      // const selectedCompanyIndex = companies.findIndex(company => company.id === activeCompany?.id);
      // if (!activeCompany || selectedCompanyIndex === -1) {
      //   // throw Error("company Not Found !!");
      //   return;
      // }
      // companies[selectedCompanyIndex] = {id: activeCompany.id, ...companyData};
      // setCompanies(companies);
      // setTags([...new Set([...tags, ...companyData.tags])]); //add new Tags
      // setAlertMsg('Company has been Edited successfully.');
      // setIsAlertOpen(true);
      // history.push(injectParamsIntoUrl('/', {}));
    }),
    [],
  );

  return {
    form,
    createUser,
    editUser,
  };
};

export default useUserForm;
