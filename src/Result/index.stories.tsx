import { Story } from '@storybook/react';
import React from 'react';

import { Button } from '../Button';

import { Result, ResultProps } from './index';

export default {
  title: 'Result',
  component: Result,
};

const Template: Story<ResultProps> = (args) => <Result {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Your operation has been executed',
  extra: <Button>OK</Button>,
};
