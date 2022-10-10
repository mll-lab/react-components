import { UploadOutlined } from '@ant-design/icons';
import { Story } from '@storybook/react';
import React from 'react';

import { Button } from '../Button/Button';

import { Upload, UploadProps } from './index';

export default {
  title: 'Upload',
};

export const Default: Story<UploadProps> = function Default(args) {
  return (
    <Upload {...args}>
      <Button icon={<UploadOutlined />}>Click to Upload</Button>
    </Upload>
  );
};
