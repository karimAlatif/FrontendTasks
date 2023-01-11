import React, {useState, useCallback, useContext, useMemo} from 'react';
import clsx from 'clsx';
import {Box, Button, Typography, Snackbar} from '@material-ui/core';
import {useHistory, Link} from 'react-router-dom';
import {Apartment, Delete} from '@material-ui/icons';
import {useStyles} from './styles';
import UserCard from './UserCard';
import UseresContext from '../../context/usersContext';
import DeleteDialog from './deleteDialog';
import {useTranslation} from 'react-i18next';
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';
import {injectParamsIntoUrl} from 'shared/utils';
import {User} from '../../definitions/types/Users';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function UseresList() {
  const classes = useStyles();
  const {t} = useTranslation();
  const [highlightedUserId, sethHighlightedUserId] = useState<string>('');
  const [isAlertDialog, setIsAlertDialog] = useState(false);
  const history = useHistory();
  const {
    users,
    activeUser,
    newUserId,
    isAlertOpen,
    alertMsg,
    setAlertMsg,
    setIsAlertOpen,
    // setUsers,
    setActiveUser,
    setNewUserId,
    deleteUsers,
  } = useContext(UseresContext);

  console.log('users', users);

  const handleDeleteConfirmation = useCallback(() => {
    if (highlightedUserId) {
      deleteUsers([highlightedUserId]);
    }
    setIsAlertDialog(false);
    sethHighlightedUserId('');
  }, [deleteUsers, highlightedUserId]);

  const handleOnDelete = useCallback((userId: string) => {
    sethHighlightedUserId(userId);
    setIsAlertDialog(true);
  }, []);

  const handleOnEdit = useCallback(
    (user: User) => {
      setActiveUser(user);
      history.push(injectParamsIntoUrl(`/create/${user.customerId}`, {}));
    },
    [history, setActiveUser],
  );

  return (
    <React.Fragment>
      <Box>
        <Box display="flex" justifyContent="space-between" mb={1} alignItems={'flex-start'}>
          <Box>
            <Box display={'flex'} alignItems={'center'}>
              <Typography className={classes.title}>{'Users'}</Typography>
            </Box>
            <Box ml={2}>
              <Typography variant="caption">{`All Users ${users.length}`}</Typography>
            </Box>
          </Box>
          <Box display="flex" justifyContent="space-between" alignItems={'center'} mr={5}>
            {
              <Box display={'flex'} justifyContent={'space-between'}>
                <Link to="/create">
                  <Button
                    className={clsx(classes.createButton, 'medium')}
                    variant="contained"
                    color="primary"
                    startIcon={<Apartment />}
                    onClick={() => {
                      setActiveUser(undefined);
                    }}
                    disableElevation
                  >
                    Create User
                  </Button>
                </Link>
              </Box>
            }
          </Box>
        </Box>
        <Box mt={4} overflow={'auto'} height="calc(100vh - 300px)">
          <Box className={clsx(classes.listingView)}>
            <Box
              display="flex"
              alignItems="center"
              flexWrap="wrap"
              justifyContent="flex-start"
              width="100%"
              mx="auto"
            >
              {users.length ? (
                users.map(user => (
                  <div
                    key={user.customerId}
                    className={clsx({
                      [classes.focused]: user.customerId === newUserId,
                    })}
                  >
                    <UserCard user={user} handleDelete={handleOnDelete} handleEdit={handleOnEdit} />
                  </div>
                ))
              ) : (
                <Typography variant="body1" className="label">
                  {`${t('users.list.no_users')}`}
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
      <DeleteDialog
        isOpen={isAlertDialog}
        setModalState={() => {
          sethHighlightedUserId('');
          setIsAlertDialog(false);
        }}
        UserName={users.find(user => user.customerId === highlightedUserId)?.customerName as string}
        onConfirm={handleDeleteConfirmation}
      />
      <Snackbar
        open={isAlertOpen}
        autoHideDuration={1000}
        onClose={() => {
          setIsAlertOpen(false);
        }}
      >
        <Alert
          onClose={() => {
            setIsAlertOpen(false);
          }}
          severity="success"
        >
          {alertMsg}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}

export default UseresList;
