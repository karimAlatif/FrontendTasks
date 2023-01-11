import React, {ReactElement, useCallback} from 'react';
import clsx from 'clsx';
import {Paper, Box, Typography, Checkbox, IconButton, Tooltip} from '@material-ui/core';
import {useStyles} from './styles';

const size = 'medium';
export interface Props {
  id: string;
  header: string;
  subHeader: string;
  adornment: React.ReactElement;
  actions: {
    icon: ReactElement;
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  }[];
}

function Card({header, subHeader, actions = [], ...item}: Props) {
  const classes = useStyles();

  return (
    <Paper elevation={0} className={clsx(classes.box, size, {selectable: true})}>
      <Box className={classes.upperSection}>
        <Box display="flex" mb="5px">
          {actions.length ? (
            <Box ml="auto" display="flex" alignItems="center" className={classes.actions}>
              {actions.map((action, index) => (
                <IconButton onClick={action.onClick} key={index} className={classes.actionBtn}>
                  {action.icon}
                </IconButton>
              ))}
            </Box>
          ) : (
            <></>
          )}
        </Box>

        <Box display="flex" alignItems="center" position="relative">
          {item.adornment && (
            <div
              className={clsx(classes.moduleShape, 'iconRounded', 'moduleShape', 'large')}
              style={{backgroundColor: '#0B6CB9'}}
            >
              {item.adornment}
            </div>
          )}
          {header && (
            <Tooltip title={header}>
              <Typography className={classes.name}>{header}</Typography>
            </Tooltip>
          )}
        </Box>
        <Box ml={6} mt={0}>
          {subHeader && (
            <Box>
              <Typography variant="caption" color="textSecondary" component="div">
                {subHeader}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Paper>
  );
}

export default Card;
