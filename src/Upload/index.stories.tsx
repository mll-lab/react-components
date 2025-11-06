import { UploadOutlined } from '@ant-design/icons';
import { StoryFn } from '@storybook/react-webpack5';
import React from 'react';

import { Button } from '../Button/Button';

import { Upload, UploadProps } from './index';

export default {
  title: 'Upload',
};

export const Default: StoryFn<UploadProps> = function Default(args) {
  return (
    <Upload {...args}>
      <Button icon={<UploadOutlined />}>Click to Upload</Button>
    </Upload>
  );
};
