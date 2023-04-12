import { Space as AntdSpace, SpaceProps as AntdSpaceProps } from 'antd';
import styled, { css } from 'styled-components';

export { SpaceSize } from 'antd/lib/space';

export type SpaceProps = AntdSpaceProps & {
  block?: boolean;
};

const TRANSIENT_PROPS: Array<keyof SpaceProps> = ['block'];

export const Space = styled(AntdSpace).withConfig<SpaceProps>({
  shouldForwardProp: (prop) => !TRANSIENT_PROPS.includes(prop),
})`
  ${(props) =>
    props.block &&
    css`
      display: flex;
    `};
`;
