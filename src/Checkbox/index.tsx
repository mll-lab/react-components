import { Checkbox as AntdCheckbox } from 'antd';
import styled from 'styled-components';

import { fontSizeFromTheme } from '../styled-utils';

export { CheckboxProps } from 'antd';
export { CheckboxChangeEvent } from 'antd/lib/checkbox';

export const Checkbox: typeof AntdCheckbox = styled(AntdCheckbox)`
  font-size: ${fontSizeFromTheme};
  .mll-ant-checkbox {
    font-size: inherit;
  }
`;
