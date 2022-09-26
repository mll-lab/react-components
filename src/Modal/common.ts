import { Modal as AntdModal } from 'antd';
import styled from 'styled-components';

export const Modal: typeof AntdModal = styled(AntdModal)`
  // fixes antd bug where prefixes do not apply correctly on all classes
  .mll-ant-modal-footer
    .mll-ant-btn
    + .mll-ant-btn:not(.mll-ant-dropdown-trigger) {
    margin-bottom: 0;
    margin-left: 8px;
  }
`;
