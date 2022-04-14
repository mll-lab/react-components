import { Space as AntdSpace, SpaceProps as AntdSpaceProps } from 'antd';
import styled, { css } from 'styled-components';

export { SpaceSize } from 'antd/lib/space';

export type SpaceProps = AntdSpaceProps & {
  block?: boolean;
};

function shouldForwardProp(prop: keyof SpaceProps) {
  const transientProps: Array<keyof SpaceProps> = ['block'];
  return !transientProps.includes(prop);
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
