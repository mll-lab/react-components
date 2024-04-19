import { Space as AntdSpace, SpaceProps as AntdSpaceProps } from 'antd';
import * as React from 'react';
import styled, { css } from 'styled-components';

export { SpaceSize } from 'antd/lib/space';

export type SpaceProps = Omit<AntdSpaceProps, 'direction'> & {
  block?: boolean;
  vertical?: boolean;
};

const TRANSIENT_PROPS: Array<string> = ['block', 'vertical'] satisfies Array<
  keyof SpaceProps
>;

export const Space: React.FC<SpaceProps> = styled(AntdSpace)
  .withConfig({
    shouldForwardProp: (prop) => !TRANSIENT_PROPS.includes(prop),
  })
  .attrs<SpaceProps>((props) => ({
    direction: props.vertical ? 'vertical' : 'horizontal',
  }))`
  ${(props: SpaceProps) =>
    props.block &&
    css`
      display: flex;
    `};
`;
