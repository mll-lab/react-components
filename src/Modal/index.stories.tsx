import { Story } from '@storybook/react';
import React from 'react';

import { Button } from '../Button';

import { FullScreenModal } from './FullScreenModal';
import { WithModal, WithModalProps } from './WithModal';

import { ModalProps } from './index';

export default {
  title: 'Modal',
  argTypes: {
    width: { control: 'number' },
  },
};

const renderShowModal: WithModalProps['opener'] = (showModal) => (
  <Button onClick={showModal}>Click to open</Button>
);

export const OpenByButton: Story<ModalProps> = (args) => (
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

export const OpenFullScreenByButton: Story<ModalProps> = (args) => (
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
