import { Space as AntdSpace, SpaceProps as AntdSpaceProps } from 'antd';
import React from 'react';
import styled from 'styled-components';

import { PREFIX_CLS } from '../Provider';
import { classNames } from '../classNames';

export { SpaceSize } from 'antd/es/space';

export type SpaceProps = AntdSpaceProps & {
  block?: boolean;
};

const BLOCK_CLASS = `${PREFIX_CLS}-space-block`;

export const StyledSpace = styled(AntdSpace)<SpaceProps>`
  &.${BLOCK_CLASS} {
    display: flex;
  }
`;

export function Space({ block, children, ...props }: SpaceProps) {
  return (
    <StyledSpace
      {...props}
      className={classNames([props.className, block ? BLOCK_CLASS : undefined])}
    >
      {children}
    </StyledSpace>
  );
}
