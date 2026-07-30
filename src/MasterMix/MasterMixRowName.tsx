import React, { ReactNode } from 'react';
import styled from 'styled-components';

const PIPETTED_MARK = '✓';

/**
 * Indents the ingredient to show it is part of the master mix and reserves the space
 * for the mark, so checking one off does not shift the layout.
 */
const MarkSlot = styled.span`
  display: inline-block;
  width: 20px;
  color: ${(props) => props.theme.successColor};
`;

export function MasterMixRowName({
  pipetted,
  children,
}: {
  pipetted: boolean;
  children: ReactNode;
}) {
  return (
    <>
      <MarkSlot title={pipetted ? 'pipettiert' : undefined}>
        {pipetted ? PIPETTED_MARK : null}
      </MarkSlot>
      {children}
    </>
  );
}
