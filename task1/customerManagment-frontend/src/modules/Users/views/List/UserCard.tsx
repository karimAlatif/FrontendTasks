import {Tooltip} from '@material-ui/core';
import React from 'react';
import {useTranslation} from 'react-i18next';
import Card from 'shared/components/Card';
import {Edit, Delete, Apartment, CheckCircle, HighlightOff} from '@material-ui/icons';
import {User} from '../../definitions/types/Users';

interface Props {
  user: User;
  handleDelete: (userId: string) => void;
  handleEdit: (user: User) => void;
}

function UserCard(props: Props) {
  const {user, handleDelete, handleEdit} = props;
  const {t} = useTranslation();

  return (
    <Card
      id={user.customerId}
      header={user.customerName}
      subHeader={user.phone}
      adornment={<Apartment />}
      actions={[
        {
          icon: (
            <Tooltip title="Edit">
              <Edit />
            </Tooltip>
          ),
          onClick: () => {
            handleEdit(user);
          },
        },
        {
          icon: (
            <Tooltip title="Delete">
              <Delete />
            </Tooltip>
          ),
          onClick: () => {
            handleDelete(user.customerId);
          },
        },
      ]}
    />
  );
}
export default UserCard;
