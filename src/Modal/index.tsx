import { Modal as AntdModal } from 'antd';
import { ModalProps as AntdModalProps } from 'antd/es/modal';
import React, { PropsWithChildren } from 'react';

export const Modal: typeof AntdModal = AntdModal;
export type ModalProps = AntdModalProps;

export function FullScreenModal({
  children,
  style,
  ...props
}: PropsWithChildren<ModalProps>) {
  return (
    <Modal width="100%" style={{ top: 0, ...style }} {...props}>
      {children}
    </Modal>
  );
}
