import { Space as AntdSpace, SpaceProps as AntdSpaceProps } from 'antd';
import * as React from 'react';
import styled, { css } from 'styled-components';

export { SpaceSize } from 'antd/lib/space';

export type SpaceProps = AntdSpaceProps & {
  block?: boolean;
};

const TRANSIENT_PROPS: Array<string> = ['block'] satisfies Array<
  keyof SpaceProps
>;

export const Space: React.FC<SpaceProps> = styled(AntdSpace).withConfig({
  shouldForwardProp: (prop) => !TRANSIENT_PROPS.includes(prop),
})`
  ${(props: SpaceProps) =>
    props.block &&
    css`
      display: flex;
    `};
`;

export function VSpace(props: SpaceProps) {
  return <Space direction='vertical' {...props} />;
}
