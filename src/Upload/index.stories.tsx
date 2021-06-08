import { Story } from '@storybook/react';
import React from 'react';

import { Upload, UploadProps } from './index';
import {Button} from "../Button";
import { UploadOutlined } from '@ant-design/icons';

export default {
  title: 'Upload',
};

export const Default: Story<UploadProps> = (args) => (
    <Upload {...args}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
    </Upload>
);
