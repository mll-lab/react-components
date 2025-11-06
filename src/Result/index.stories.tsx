import { StoryFn } from '@storybook/react';
import React from 'react';

import { Button } from '../Button/Button';

import { EntityNotFound, Result, ResultProps } from './index';

export default {
  title: 'Result',
  component: Result,
};

const Template: StoryFn<ResultProps> = function Template(args) {
  return <Result {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  title: 'Your operation has been executed',
  extra: <Button>OK</Button>,
};

export const EntityNotFoundExample: StoryFn = function EntityNotFoundExample() {
  return <EntityNotFound entity="Kontrolle" id="4" />;
};
