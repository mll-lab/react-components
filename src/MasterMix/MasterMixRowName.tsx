import React, { ReactNode } from 'react';
import styled from 'styled-components';

const PIPETTED_MARK = '✓';
const INDENT_STEP_IN_PIXELS = 20;

/**
 * Indents by one step per sum the row contributes to, and holds the mark right before the
 * name so that checking one off neither shifts the layout nor detaches from its row.
 */
const Indent = styled.span<{ $level: number }>`
  display: inline-block;
  width: ${(props) => props.$level * INDENT_STEP_IN_PIXELS}px;
  text-align: right;
  color: ${(props) => props.theme.successColor};
`;

export function MasterMixRowName({
  level,
  pipetted,
  children,
}: {
  level: number;
  pipetted: boolean;
  children: ReactNode;
}) {
  return (
    <>
      <Indent $level={level} title={pipetted ? 'pipettiert' : undefined}>
        {pipetted ? PIPETTED_MARK : null}
      </Indent>
      {children}
    </>
  );
}
