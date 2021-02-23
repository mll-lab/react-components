import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, color } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { SaveButtonByNumpadEnter } from './SaveButtonByNumpadEnter';

import {
  Button,
  CreateButton,
  SaveButton,
  EditButton,
  WarningButton,
  ResetButton,
  DeleteButton,
  InfoButton,
} from './index';

function makeButtonDemoProps() {
  return {
    onClick: action('clicked'),
    filled: boolean('filled', false),
    dashed: boolean('dashed', false),
    block: boolean('block', false),
  };
}

storiesOf('Button', module)
  .addDecorator(withKnobs)
  .add('Default', () => (
    <>
      <Button color={color('color', 'blue')} {...makeButtonDemoProps()}>
        Default Button
      </Button>
      <Button color={color('color', 'blue')} {...makeButtonDemoProps()}>
        Default Button
      </Button>
    </>
  ))
  .add('Create', () => <CreateButton {...makeButtonDemoProps()} />)
  .add('Save', () => <SaveButton {...makeButtonDemoProps()} />)
  .add('Save with hotkey', () => (
    <div>
      <div style={{ marginBottom: '1em' }}>
        Triggered also with the Numpad Enter:
      </div>
      <SaveButtonByNumpadEnter {...makeButtonDemoProps()} />
    </div>
  ))
  .add('Info', () => <InfoButton {...makeButtonDemoProps()} />)
  .add('Edit', () => <EditButton {...makeButtonDemoProps()} />)
  .add('Warning', () => (
    <WarningButton {...makeButtonDemoProps()}>
      Do something slightly dangerous
    </WarningButton>
  ))
  .add('Reset', () => <ResetButton {...makeButtonDemoProps()} />)
  .add('Delete', () => <DeleteButton {...makeButtonDemoProps()} />);
