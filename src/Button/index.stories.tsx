import { StoryFn } from '@storybook/react-webpack5';
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
  args: {
    loading: false,
    disabled: false,
  },
  argTypes: {
    color: { control: 'color' },
    onClick: { action: 'clicked' },
    size: {
      control: {
        type: 'select',
      },
      options: ['small', 'medium', 'large'],
    },
  },
};

export const Default: StoryFn<ButtonProps> = function Default(args) {
  return <Button {...args}>Default</Button>;
};
export const Create: StoryFn<ButtonProps> = function Create(args) {
  return <CreateButton {...args} />;
};
export const Save: StoryFn<ButtonProps> = function Save(args) {
  return <SaveButton {...args} />;
};
export const SaveWithHotkey: StoryFn<SaveButtonByNumpadEnterProps> =
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
export const Info: StoryFn<ButtonProps> = function Info(args) {
  return <InfoButton {...args}>Info</InfoButton>;
};
export const Edit: StoryFn<ButtonProps> = function Edit(args) {
  return <EditButton {...args} />;
};
export const Warning: StoryFn<ButtonProps> = function Warning(args) {
  return (
    <WarningButton {...args}>Do something slightly dangerous</WarningButton>
  );
};
export const Cancel: StoryFn<ButtonProps> = function Cancel(args) {
  return <CancelButton {...args} />;
};
export const Reset: StoryFn<ButtonProps> = function Reset(args) {
  return <ResetButton {...args} />;
};
export const Delete: StoryFn<ButtonProps> = function Delete(args) {
  return <DeleteButton {...args} />;
};
export const Send: StoryFn<ButtonProps> = function Send(args) {
  return <SendButton {...args} />;
};
