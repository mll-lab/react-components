import React, { PropsWithChildren } from 'react';

import { Modal, ModalProps } from './index';

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
