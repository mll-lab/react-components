import React, {
  ComponentType,
  MouseEventHandler,
  ReactElement,
  ReactNode,
  useState,
} from 'react';

import { Modal, ModalProps } from './Modal';

export type WithModalProps = {
  children: ReactNode;
  opener: (showModal: () => void) => ReactElement;
  ModalComponent?: ComponentType<ModalProps>;
} & ModalProps;

export function WithModal({
  opener,
  ModalComponent = Modal,
  onOk,
  onCancel,
  children,
  ...modalProps
}: WithModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  const showModal = () => {
    setIsVisible(true);
  };

  const hideModal = () => {
    setIsVisible(false);
  };

  const handleOk: MouseEventHandler<HTMLElement> = (e) => {
    onOk?.(e);
    hideModal();
  };

  const handleCancel: MouseEventHandler<HTMLElement> = (e) => {
    onCancel?.(e);
    hideModal();
  };

  return (
    <>
      {opener(showModal)}
      <ModalComponent
        visible={isVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        {...modalProps}
      >
        {children}
      </ModalComponent>
    </>
  );
}
