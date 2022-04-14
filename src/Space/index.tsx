import { Space as AntdSpace, SpaceProps as AntdSpaceProps } from 'antd';
import React from 'react';
import styled from 'styled-components';

import { PREFIX_CLS } from '../Provider';
import { classNames } from '../classNames';

export { SpaceSize } from 'antd/lib/space';

export type SpaceProps = AntdSpaceProps & {
  block?: boolean;
};

function shouldForwardProp(prop: keyof SpaceProps) {
  return !['block'].includes(prop);
}

export const Space = styled(Space).withConfig<SpaceProps>({
  shouldForwardProp,
})`
  ${(props) => (props.block ? 'display: flex;' : '')}
`;

export function Space({ block, children, ...props }: SpaceProps) {
  return (
    <StyledSpace
      {...props}
      className={classNames([props.className, block && BLOCK_CLASS])}
    >
      {children}
    </StyledSpace>
  );
}
