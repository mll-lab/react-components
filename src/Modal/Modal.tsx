import { Modal as AntdModal, ModalProps as AntdModalProps } from 'antd';
import * as styledModule from 'styled-components';

// There are import issues when https://github.com/styled-components/babel-plugin-styled-components/issues/315#issuecomment-784297947
const { createGlobalStyle } = styledModule;
const styled = styledModule.default;

export type ModalProps = AntdModalProps;
export const Modal: typeof AntdModal = styled(AntdModal)`
  // Fixes antd bug where prefixes do not apply correctly on all classes.
  // Styles are copied from antd.
  .mll-ant-modal-footer
    .mll-ant-btn
    + .mll-ant-btn:not(.mll-ant-dropdown-trigger) {
    margin-bottom: 0;
    margin-left: 8px;
  }
`;

export const ModalConfirmStyles = createGlobalStyle`
  // Fixes antd bug where prefixes do not apply correctly on all classes.
  // Styles are copied from antd.
  .mll-ant-modal-confirm .mll-ant-modal-confirm-btns .mll-ant-btn + .mll-ant-btn {
    margin-bottom: 0;
    margin-left: 8px;
  }
`;
