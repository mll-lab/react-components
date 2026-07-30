import React, { ReactNode } from 'react';
import styled from 'styled-components';

const PIPETTED_MARK = '✓';
const INDENT_STEP_IN_PIXELS = 20;
const MARK_GAP_IN_PIXELS = 5;

/**
 * Indents by one step per sum the row contributes to, and holds the mark right before the
 * name so that checking one off neither shifts the layout nor detaches from its row.
 * The offset separates the mark from the name without moving the name on any level.
 */
const Indent = styled.span<{ $level: number }>`
  display: inline-block;
  position: relative;
  right: ${MARK_GAP_IN_PIXELS}px;
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
