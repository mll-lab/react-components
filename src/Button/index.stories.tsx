import { Story } from '@storybook/react';
import React from 'react';

import {
  SaveButtonByNumpadEnter,
  SaveButtonByNumpadEnterProps,
} from './SaveButtonByNumpadEnter';

import {
  Button,
  ButtonProps,
  CreateButton,
  DeleteButton,
  EditButton,
  InfoButton,
  ResetButton,
  SaveButton,
  WarningButton,
} from './index';

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    color: { control: 'color' },
    onClick: { action: 'clicked' },
  },
};

export const Default: Story<ButtonProps> = (args) => (
  <Button {...args}>Default</Button>
);
export const Create: Story<ButtonProps> = (args) => <CreateButton {...args} />;
export const Save: Story<ButtonProps> = (args) => <SaveButton {...args} />;
export const SaveWithHotkey: Story<SaveButtonByNumpadEnterProps> = (args) => (
  <div>
    <div style={{ marginBottom: '1em' }}>
      Triggered also with the Numpad Enter:
    </div>
    <SaveButtonByNumpadEnter {...args} />
  </div>
);
export const Info: Story<ButtonProps> = (args) => <InfoButton {...args} />;
export const Edit: Story<ButtonProps> = (args) => <EditButton {...args} />;
export const Warning: Story<ButtonProps> = (args) => (
  <WarningButton {...args}>Do something slightly dangerous</WarningButton>
);
export const Reset: Story<ButtonProps> = (args) => <ResetButton {...args} />;
export const Delete: Story<ButtonProps> = (args) => <DeleteButton {...args} />;
