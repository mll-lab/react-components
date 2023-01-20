import { Space as AntdSpace, SpaceProps as AntdSpaceProps } from 'antd';
import * as React from 'react';
import styled, { css } from 'styled-components';

export { SpaceSize } from 'antd/lib/space';

export type SpaceProps = AntdSpaceProps & {
  block?: boolean;
};

const TRANSIENT_PROPS: Array<keyof SpaceProps> = ['block'];

// Copied from antd/lib/space/index.d.ts to fix:
// TS4023: Exported variable 'Space' has or is using name 'CompoundedComponent' from external module "/home/runner/work/react-components/react-components/node_modules/antd/lib/space/index" but cannot be named.
type CompoundedComponent = {
  Compact: typeof AntdSpace.Compact;
} & React.FC<SpaceProps>;

export const Space = styled<CompoundedComponent>(
  AntdSpace,
).withConfig<SpaceProps>({
  shouldForwardProp: (prop) => !TRANSIENT_PROPS.includes(prop),
})`
  ${(props) =>
    props.block &&
    css`
      display: flex;
    `};
`;
Space.Compact = AntdSpace.Compact;
