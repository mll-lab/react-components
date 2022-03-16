import {
  Tag as AntdTag,
  TagProps as AntdTagProps,
  TagType as AntdTagType,
} from 'antd';
import { CheckableTagProps as AntdCheckableTagProps } from 'antd/lib/tag/CheckableTag';
import styled from 'styled-components';

import { fontSizeFromTheme } from '../styled-utils';

export type TagProps = AntdTagProps;
export type TagType = AntdTagType;
export type CheckableTagProps = AntdCheckableTagProps;

const StyledTag: typeof AntdTag = styled(AntdTag)<TagProps>`
  font-size: ${fontSizeFromTheme};
`;

const StyledCheckableTag = styled(StyledTag.CheckableTag)<CheckableTagProps>`
  font-size: ${fontSizeFromTheme};
`;

export const Tag: typeof AntdTag = StyledTag;

Tag.CheckableTag = StyledCheckableTag;
