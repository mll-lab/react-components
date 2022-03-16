import {
  Tag as AntdTag,
  TagProps as AntdTagProps,
  TagType as AntdTagType,
} from 'antd';
import { CheckableTagProps as AntdCheckableTagProps } from 'antd/lib/tag/CheckableTag';
import styled from 'styled-components';

export type TagProps = AntdTagProps;
export type TagType = AntdTagType;
export type CheckableTagProps = AntdCheckableTagProps;

const StyledTag: typeof AntdTag = styled(AntdTag)<TagProps>`
  font-size: ${(props) => props.theme.fontSize};
`;

const StyledCheckableTag = styled(StyledTag.CheckableTag)<CheckableTagProps>`
  font-size: ${(props) => props.theme.fontSize};
`;

export const Tag: typeof AntdTag = StyledTag;

Tag.CheckableTag = StyledCheckableTag;
