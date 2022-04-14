import { Space as AntdSpace, SpaceProps as AntdSpaceProps } from 'antd';
import styled, { css } from 'styled-components';

export { SpaceSize } from 'antd/lib/space';

export type SpaceProps = AntdSpaceProps & {
  block?: boolean;
};

const TRANSIENT_PROPS: Array<keyof SpaceProps> = ['block'];

function shouldForwardProp(prop: keyof SpaceProps) {
  return !TRANSIENT_PROPS.includes(prop);
}

export const Space = styled(AntdSpace).withConfig<SpaceProps>({
  shouldForwardProp,
})`
  ${(props) =>
    props.block &&
    css`
      display: flex;
    `};
`;
