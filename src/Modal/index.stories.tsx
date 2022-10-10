import { Story } from '@storybook/react';
import React from 'react';

import { Button } from '../Button/Button';

import { FullScreenModal } from './FullScreenModal';
import { ModalProps } from './Modal';
import { WithModal, WithModalProps } from './WithModal';

export default {
  title: 'Modal',
  argTypes: {
    width: { control: 'number' },
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
