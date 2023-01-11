import React from 'react';
import {useTranslation} from 'react-i18next';
import {Box, FormControl, Switch, FormControlLabel} from '@material-ui/core';
import {useStyles} from './styles';
import Typography from '@material-ui/core/Typography';
import {useFormContext} from 'react-hook-form';
import {UserData} from '../../definitions/types/index';
import ActiveSVG from '../../assets/active.svg';
import InActiveSVG from '../../assets/inActive.svg';
import {Info} from '@material-ui/icons';

const UserState = (): React.ReactElement => {
  const {t} = useTranslation();
  const classes = useStyles();

  const form = useFormContext<UserData>();
  const {setValue, watch} = form;

  return (
    <React.Fragment>
      <Box display="flex" justifyContent="center" flexDirection="column" width="25vw">
        <Box height="40vh">
          <img src={ActiveSVG} width="100%" height="100%" />
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default UserState;
