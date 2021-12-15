import { Upload as AntdUpload, UploadProps as AntdUploadProps } from 'antd';
import { UploadFile as AntdUploadFile } from 'antd/lib/upload/interface';

export const Upload: typeof AntdUpload = AntdUpload;
export type UploadProps = AntdUploadProps;
export type UploadFile = AntdUploadFile;
