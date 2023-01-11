import React, {useContext, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {UserData} from '../../definitions/types';
import {useForm, FormProvider} from 'react-hook-form';
import UserWrapper from './UserWrapper';
import UseresContext from '../../context/usersContext';

const UserForm = () => {
  const {t} = useTranslation();
  const {activeUser} = useContext(UseresContext);

  const form = useForm<UserData>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      customerName: activeUser?.customerName || '',
      phone: activeUser?.phone || '',
    },
  });
  const {register} = form;

  useEffect(() => {
    // register('tags');
  }, []);

  return (
    <FormProvider {...form}>
      <UserWrapper />
    </FormProvider>
  );
};

export default UserForm;
