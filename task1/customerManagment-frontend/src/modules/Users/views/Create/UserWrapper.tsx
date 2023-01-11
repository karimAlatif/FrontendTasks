import React, {useCallback, useMemo, useContext} from 'react';
import clsx from 'clsx';
import {useTranslation} from 'react-i18next';
import {Box, Button} from '@material-ui/core';
import {useStyles} from './styles';
import Typography from '@material-ui/core/Typography';
import useUserForm from '../../actions/useUserForm';
import UserDetails from './UserDetails';
import UserState from './UserState';
import UsersContext from '../../context/usersContext';
import {Link} from 'react-router-dom';

const UserWrapper = (): React.ReactElement => {
  const {t} = useTranslation();
  const classes = useStyles();
  const {createUser, editUser, form} = useUserForm();
  const {activeUser} = useContext(UsersContext);

  const {errors, watch} = form;
  const {customerName, phone} = watch();

  const isDisabledCreating = useCallback(() => {
    //adding cases
    if (!customerName || !phone || Object.keys(errors).length) {
      return true;
    }

    if (activeUser) {
      if (customerName === activeUser.customerName && phone === activeUser.phone) {
        return true;
      }
    }
    return false;
  }, [activeUser, errors, customerName, phone]);

  return (
    <React.Fragment>
      <Typography variant={'h4'} className={clsx(classes.title)}>
        {` ${activeUser ? t('users.form.editTitle') : t('users.form.title')}`}
      </Typography>
      <Box width={'100%'} display={'flex'}>
        <Box
          display="flex"
          flexDirection={'column'}
          className={clsx(classes.drawerBody)}
          width={'50%'}
        >
          <UserDetails />
        </Box>
        <Box
          display="flex"
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          className={clsx(classes.drawerBody)}
          width={'50%'}
        >
          <UserState />
        </Box>
      </Box>

      <Box display={'flex'} justifyContent={'flex-end'} mt={0} className="action-wrapper">
        <Link to="/">
          <Button
            className={clsx(classes.defualtButton, 'fixedWidth', 'small')}
            variant={'contained'}
          >
            Back
          </Button>
        </Link>
        <Button
          disabled={isDisabledCreating()}
          onClick={() => {
            activeUser ? editUser() : createUser();
          }}
          className={clsx(classes.createButton, 'medium')}
          variant={'contained'}
          color="primary"
          disableElevation
        >
          {activeUser ? 'Edit' : 'Create'}
        </Button>
      </Box>
    </React.Fragment>
  );
};

export default UserWrapper;
