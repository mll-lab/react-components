import { useState } from '@storybook/addons';
import { Story } from '@storybook/react';
import React from 'react';

import { FullScreenModal, Modal, ModalProps } from './index';

export default {
  title: 'Modal',
  argTypes: {
    width: { control: 'number' },
  },
};

export const OpenByButton: Story<ModalProps> = (args) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <button onClick={showModal}>Click me to open modal</button>

      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        {...args}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

export const OpenFullScreenByButton: Story<ModalProps> = (args) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <button onClick={showModal}>Click me to open modal</button>

      <FullScreenModal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        {...args}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </FullScreenModal>
    </>
  );
};
