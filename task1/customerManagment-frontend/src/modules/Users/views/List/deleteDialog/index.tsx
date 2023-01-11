import React from 'react';
import Dialog from 'shared/components/Dialog';

interface Props {
  isOpen: boolean;
  setModalState: (state: boolean) => void;
  UserName: string;
  onConfirm: () => void;
}

function DeleteDialog(props: Props) {
  const {isOpen, setModalState, UserName, onConfirm} = props;

  return (
    <Dialog
      open={isOpen}
      disableBackdropClick={true}
      title={`Deleting User`}
      content={
        <div style={{wordBreak: 'normal'}}>
          {`Are you sure to delete ${
            `"${UserName}"` || 'selected user'
          } from your project permanently? You won't be able to retore it.`}
        </div>
      }
      actions={[
        {
          text: 'CANCEL',
          onClick: () => {
            setModalState(false);
          },
          variant: 'secondary',
        },
        {
          text: 'Delete',
          onClick: onConfirm,
          variant: 'danger',
        },
      ]}
      onClose={() => setModalState(false)}
    />
  );
}

export default DeleteDialog;
