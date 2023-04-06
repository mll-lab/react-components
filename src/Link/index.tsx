import React from 'react';
import styled from 'styled-components';

const StyledLink = styled.a`
  color: ${(props) => props.theme.borderColor};
`;

export function Link({
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <StyledLink {...props}>{children}</StyledLink>;
}
