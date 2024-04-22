import { Story } from '@storybook/react';
import React from 'react';

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
  SaveButtonByNumpadEnter,
  SaveButtonByNumpadEnterProps,
  SendButton,
  CancelButton,
} from '..';

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    color: { control: 'color' },
    onClick: { action: 'clicked' },
    size: {
      control: {
        type: 'select',
        options: ['small', 'medium', 'large'],
      },
    },
    loading: {
      control: {
        type: 'boolean',
      },
    },
    disabled: {
      control: {
        type: 'boolean',
      },
    },
  },
};

export const Default: Story<ButtonProps> = function Default(args) {
  return <Button {...args}>Default</Button>;
};
export const Create: Story<ButtonProps> = function Create(args) {
  return <CreateButton {...args} />;
};
export const Save: Story<ButtonProps> = function Save(args) {
  return <SaveButton {...args} />;
};
export const SaveWithHotkey: Story<SaveButtonByNumpadEnterProps> =
  function SaveWithHotkey(args) {
    return (
      <div>
        <div style={{ marginBottom: '1em' }}>
          Triggered also with the Numpad Enter:
        </div>
        <SaveButtonByNumpadEnter {...args} />
      </div>
    );
  };
export const Info: Story<ButtonProps> = function Info(args) {
  return <InfoButton {...args}>Info</InfoButton>;
};
export const Edit: Story<ButtonProps> = function Edit(args) {
  return <EditButton {...args} />;
};
export const Warning: Story<ButtonProps> = function Warning(args) {
  return (
    <WarningButton {...args}>Do something slightly dangerous</WarningButton>
  );
};
export const Cancel: Story<ButtonProps> = function Cancel(args) {
  return <CancelButton {...args} />;
};
export const Reset: Story<ButtonProps> = function Reset(args) {
  return <ResetButton {...args} />;
};
export const Delete: Story<ButtonProps> = function Delete(args) {
  return <DeleteButton {...args} />;
};
export const Send: Story<ButtonProps> = function Send(args) {
  return <SendButton {...args} />;
};
