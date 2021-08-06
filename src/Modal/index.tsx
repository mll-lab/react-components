import { Modal as AntdModal } from 'antd';
import { ModalProps as AntdModalProps } from 'antd/es/modal';

export const Modal: typeof AntdModal = AntdModal;
export type ModalProps = AntdModalProps;

export * from './FullScreenModal';
export * from './WithModal';
