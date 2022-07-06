import { Checkbox as AntdCheckbox } from 'antd';
import styled from 'styled-components';
import { fontSizeFromTheme } from '../styled-utils';

export { CheckboxProps } from 'antd';

export const Checkbox: typeof AntdCheckbox = styled(AntdCheckbox)`
  font-size: ${fontSizeFromTheme};
`;
