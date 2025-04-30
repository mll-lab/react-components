import { Story } from '@storybook/react';
import React from 'react';

import { Button } from '../Button/Button';

import { FullScreenModal } from './FullScreenModal';
import { Modal, ModalProps } from './Modal';
import { WithModal, WithModalProps } from './WithModal';

export default {
  title: 'Modal',
  args: {
    width: 500,
  },
};

const renderShowModal: WithModalProps['opener'] = function renderShowModal(
  showModal,
) {
  return <Button onClick={showModal}>Click to open</Button>;
};

export const OpenByButton: Story<ModalProps> = function OpenByButton(args) {
  return (
    <WithModal
      opener={renderShowModal}
      title="Launch Sequence"
      okText="Launch the nukes"
      cancelText="Avoid mass destruction"
      {...args}
    >
      Atomic weapons are dangerous.
    </WithModal>
  );
};

export const OpenFullScreenByButton: Story<ModalProps> =
  function OpenFullScreenByButton(args) {
    return (
      <WithModal
        opener={renderShowModal}
        ModalComponent={FullScreenModal}
        title="Full Screen Modal"
        {...args}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </WithModal>
    );
  };

export const ModalConfirm: Story<ModalProps> = function ModalConfirm(args) {
  const openModal = () =>
    Modal.confirm({
      title: 'Programmatically opened confirm modal',
      content: 'Some content',
      okText: 'Yes',
      cancelText: 'No',
      width: args.width,
    });
  return <Button onClick={openModal}>Open Modal</Button>;
};
