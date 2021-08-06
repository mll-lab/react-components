import React, { PropsWithChildren } from 'react';

import { Modal, ModalProps } from './index';

type FullScreenModalProps = PropsWithChildren<ModalProps>;

export function FullScreenModal({
  children,
  style,
  ...props
}: FullScreenModalProps) {
  return (
    <Modal width="100%" style={{ top: 0, ...style }} {...props}>
      {children}
    </Modal>
  );
}
