import React, {
  ComponentType,
  MouseEventHandler,
  ReactNode,
  useState,
} from 'react';

import { Modal, ModalProps } from './index';

type WithOnClick = {
  onClick?: MouseEventHandler<HTMLElement>;
};

export type WithModalProps<P extends WithOnClick> = {
  children: ReactNode;
  Component: ComponentType<P>;
  componentProps?: P;
  ModalComponent?: ComponentType<ModalProps>;
} & ModalProps;

export function WithModal<P extends WithOnClick>({
  Component,
  componentProps,
  ModalComponent = Modal,
  onOk,
  onCancel,
  children,
  ...modalProps
}: WithModalProps<P>) {
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
      {/* @ts-ignore how to enforce no unsuited subtype of onClick is used? */}
      <Component onClick={showModal} {...componentProps} />
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
