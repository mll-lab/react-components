import { Modal as AntdModal } from 'antd';
import styled from 'styled-components';

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
