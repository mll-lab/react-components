import {
  Typography as AntdTypography,
  TypographyProps as AntdTypographyProps,
} from 'antd';
import React, { PropsWithChildren } from 'react';
import styled, { css, ThemedStyledProps } from 'styled-components';

import { PREFIX_CLS } from '../Provider';
import { HEADER_SIZES, HeaderSize, Theme } from '../theme';

export type TypographyProps = AntdTypographyProps;

function headerFontSizeFromTheme(headerSize: HeaderSize) {
  return (props: ThemedStyledProps<AntdTypographyProps['Title'], Theme>) =>
    props.theme.typography?.[headerSize]?.fontSize;
}

function headerLineHeightFromTheme(headerSize: HeaderSize) {
  return (props: ThemedStyledProps<AntdTypographyProps['Title'], Theme>) =>
    props.theme.typography?.[headerSize]?.lineHeight;
}

const StyledTitle = styled(AntdTypography.Title)`
  ${(props) =>
    HEADER_SIZES.map(
      (size) => css`
        &.${PREFIX_CLS}-typography {
          font-size: ${headerFontSizeFromTheme(
            `h${props.level}` as HeaderSize,
          )};
          line-height: ${headerLineHeightFromTheme(size)};
        }
      `,
    )} //&h1.mll-ant-typography {
  //  font-size: 5px;
  //  line-height: 1.3em;
  //}
  //font-size: 5px;
  //line-height: 1.3em;
  &h1 {
    font-size: 5px;
    line-height: 1.3em;
  }
`;

export function TypographyTitle({
  children,
  ...props
}: PropsWithChildren<AntdTypographyProps['Title']>) {
  return <StyledTitle {...props}>{children}</StyledTitle>;
}
//
// export function Title({
//                              children,
//                              ...props
//                            }: PropsWithChildren<AntdTypographyProps>) {
//   return <StyledTitle.Title>{children}<StyledTitle.Title>
// }

// Typography.Title = StyledTypography.Title;
// Typography.Text = StyledTypography.Text;
// Typography.Paragraph = StyledTypography.Paragraph;
// Typography.Link = StyledTypography.Link;

export const Typography = {
  Title: TypographyTitle,
  Text: AntdTypography.Text,
  Paragraph: AntdTypography.Paragraph,
  Link: AntdTypography.Link,
};
