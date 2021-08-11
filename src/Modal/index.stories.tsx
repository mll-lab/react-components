import { Story } from '@storybook/react';
import React from 'react';

import { Button } from '../Button';

import { FullScreenModal } from './FullScreenModal';
import { WithModal } from './WithModal';

import { ModalProps } from './index';

export default {
  title: 'Modal',
  argTypes: {
    width: { control: 'number' },
  },
};

export const OpenByButton: Story<ModalProps> = (args) => (
  <WithModal
    opener={(showModal) => <Button onClick={showModal}>Click to open</Button>}
    title="Basic Modal"
    {...args}
  >
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </WithModal>
);

export const OpenFullScreenByButton: Story<ModalProps> = (args) => (
  <WithModal
    opener={(showModal) => <Button onClick={showModal}>Click to open</Button>}
    ModalComponent={FullScreenModal}
    title="Full Screen Modal"
    {...args}
  >
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </WithModal>
);
