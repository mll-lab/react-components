import React from 'react';
import styled from 'styled-components';

const StyledAnchor = styled.a`
  color: ${(props) => props.theme.anchorColor};
`;

export function Anchor({
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <StyledAnchor {...props}>{children}</StyledAnchor>;
}
