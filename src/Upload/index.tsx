import { Upload as AntdUpload, UploadProps as AntdUploadProps } from 'antd';
import { RcFile as AntdRcFile } from 'antd/es/upload';
import { UploadFile as AntdUploadFile } from 'antd/lib/upload/interface';

export const Upload: typeof AntdUpload = AntdUpload;
export type UploadProps = AntdUploadProps;
export type UploadFile = AntdUploadFile;
export type RcFile = AntdRcFile;
