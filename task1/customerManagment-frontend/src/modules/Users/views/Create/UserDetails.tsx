import React, {useCallback, useContext} from 'react';
import clsx from 'clsx';
import {useTranslation} from 'react-i18next';
import {Box, TextField, FormControl, InputLabel, Select, MenuItem} from '@material-ui/core';
import {useStyles} from './styles';
import Typography from '@material-ui/core/Typography';
import {Controller} from 'react-hook-form';
import useUserForm from '../../actions/useUserForm';
import {checkNameField} from '../../definitions/validation/nameField';
import {checkAddressField} from '../../definitions/validation/addressField';
import Autocomplete, {createFilterOptions} from '@material-ui/lab/Autocomplete';
import Chip from 'shared/components/Chip';
import UseresContext from '../../context/usersContext';

const filter = createFilterOptions<string>();

const UserDetails = (): React.ReactElement => {
  const {t} = useTranslation();
  const classes = useStyles();
  const {users} = useContext(UseresContext);
  const {form} = useUserForm();

  const {register, errors, setValue, watch, control} = form;
  const {customerName, phone} = watch();

  return (
    <React.Fragment>
      <Typography variant={'h6'} className={clsx(classes.subTitle)}>
        {`${t('users.form.subTitle')}`}
      </Typography>
      <Box mt={1}>
        <TextField
          fullWidth
          label={`${t('users.form.name')}`}
          name="customerName"
          inputRef={register(checkNameField())}
          placeholder="Name"
          error={Boolean(errors.customerName)}
          onChange={event => {
            const {value} = event.target;
            setValue('customerName', value.trimStart().replace(/  +/g, ' '), {
              shouldDirty: true,
              shouldValidate: true,
            });
          }}
          defaultValue={customerName}
          helperText={errors.customerName && errors.customerName?.message}
          className={clsx('left')}
          autoFocus
        />
        <Box mt={4} className={classes.formControl}>
          <TextField
            inputRef={register(checkAddressField())}
            name="phone"
            fullWidth
            label={`${t('users.form.phone')}`}
            inputProps={{
              maxLength: 32,
            }}
            placeholder="phone"
            error={Boolean(errors.phone)}
            defaultValue={phone}
            helperText={errors.phone && errors.phone?.message}
            className={clsx('left')}
            autoFocus
          />
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default UserDetails;
