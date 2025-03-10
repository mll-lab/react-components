import styled, { css } from 'styled-components';

export const AnimationsConfiguration = styled.div<{
  $inputAnimationsDisabled: boolean;
}>`
  ${(props) =>
    props.$inputAnimationsDisabled &&
    css`
      .mll-ant-motion-input {
        animation: none !important;
        transition: none !important;
      }

      .mll-ant-input {
        min-height: initial !important;
      }
    `};
`;
