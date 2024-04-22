import { Checkbox as AntdCheckbox } from 'antd';
import styled from 'styled-components';

import { fontSizeFromTheme } from '../styled-utils';

export { CheckboxProps } from 'antd';
export { CheckboxChangeEvent } from 'antd/lib/checkbox';

/**
 * Are there both truthy and falsy values in the given array of booleans?
 */
export function indeterminate(
  booleans: Array<boolean | undefined | null> | undefined | null,
): boolean {
  if (!booleans) {
    return false;
  }

  return booleans.some((value) => value) && booleans.some((value) => !value);
}

export const Checkbox: typeof AntdCheckbox = styled(AntdCheckbox)`
  font-size: ${fontSizeFromTheme};
  .mll-ant-checkbox {
    font-size: inherit;
  }
`;
