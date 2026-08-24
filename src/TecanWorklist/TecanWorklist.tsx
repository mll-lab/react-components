import React, { CSSProperties, ReactElement, ReactNode } from 'react';
import styled from 'styled-components';

import { Checkbox } from '../Checkbox';
import { Space } from '../Space';
import { PALETTE } from '../theme';

import { GwlField, GwlFieldRole, GwlStep, parseGwl } from './parseGwl';

/**
 * Colors the pipetting commands apart, so a glance shows what a step does.
 * Commands without a color merely keep the robot going (wash, break, tip type).
 */
const COMMAND_COLOR: Record<string, string> = {
  A: PALETTE.red, // Aspirate
  D: PALETTE.gold, // Dispense
  R: PALETTE.blue, // ReagentDistribution
};

const FIELD_STYLE: Record<GwlFieldRole, CSSProperties> = {
  command: { fontWeight: 'bold' },
  plain: { color: PALETTE.gray6 },
  position: { color: PALETTE.tableHeaderBackgroundColor, fontWeight: 'bold' },
  volume: { color: PALETTE.green, fontWeight: 'bold' },
};

function fieldStyle({ role, text }: GwlField): CSSProperties {
  if (role !== 'command') {
    return FIELD_STYLE[role];
  }

  return {
    ...FIELD_STYLE.command,
    color: COMMAND_COLOR[text] ?? PALETTE.gray7,
  };
}

const CODE_STYLE: CSSProperties = {
  backgroundColor: PALETTE.white,
  border: `1px solid ${PALETTE.gray3}`,
  fontFamily: 'monospace',
  maxHeight: '400px',
  overflow: 'auto',
  width: '100%',
};

const LINE_STYLE: CSSProperties = {
  display: 'flex',
  whiteSpace: 'pre',
};

/**
 * The line number is generated content, not text: `user-select: none` alone
 * still lands in the clipboard, so a copied selection would not be valid GWL.
 */
const Gutter = styled.span`
  background-color: ${PALETTE.gray1};
  border-right: 1px solid ${PALETTE.gray3};
  color: ${PALETTE.gray5};
  flex-shrink: 0;
  padding-right: 8px;
  text-align: right;
  width: 4em;

  &::before {
    content: attr(data-line-number);
  }
`;

const COMMENT_LINE_STYLE: CSSProperties = {
  paddingLeft: '8px',
};

const COMMENT_STYLE: CSSProperties = {
  color: PALETTE.gray9,
  fontWeight: 'bold',
};

/** Ties the commands visually to the comment they carry out. */
const COMMAND_STYLE: CSSProperties = {
  borderLeft: `2px solid ${PALETTE.gray3}`,
  marginLeft: '8px',
  paddingLeft: '10px',
};

const STEP_STYLE: CSSProperties = {
  paddingBottom: '4px',
};

const SEPARATOR_STYLE: CSSProperties = {
  color: PALETTE.gray5,
};

export type TecanWorklistProps = {
  /** Raw Gemini worklist to render. */
  gwl: string;
  /** Controls placed before the command toggle, such as a device selection. */
  toolbar?: ReactNode;
};

function GwlStepView({
  step,
  showCommands,
}: {
  step: GwlStep;
  showCommands: boolean;
}): ReactElement {
  return (
    <div style={STEP_STYLE}>
      {step.comment == null ? null : (
        <div style={LINE_STYLE}>
          <Gutter data-line-number={step.lineNumber} />
          {/* The C; prefix stays so a copied selection is valid GWL again. */}
          <span style={COMMENT_LINE_STYLE}>
            <span style={fieldStyle({ role: 'command', text: 'C' })}>C</span>
            <span style={SEPARATOR_STYLE}>;</span>
            <span style={COMMENT_STYLE}>{step.comment}</span>
          </span>
        </div>
      )}
      {showCommands
        ? step.commands.map((command) => (
            <div key={command.lineNumber} style={LINE_STYLE}>
              <Gutter data-line-number={command.lineNumber} />
              <span style={COMMAND_STYLE}>
                {command.fields.map((field, index) => (
                  // The index is the identity of a field: its position in the
                  // record is what gives it meaning, fields never reorder.
                  // eslint-disable-next-line react/no-array-index-key
                  <React.Fragment key={index}>
                    {index === 0 ? null : (
                      <span style={SEPARATOR_STYLE}>;</span>
                    )}
                    <span style={fieldStyle(field)}>{field.text}</span>
                  </React.Fragment>
                ))}
              </span>
            </div>
          ))
        : null}
    </div>
  );
}

/**
 * Renders a Tecan worklist grouped into the steps its comments describe,
 * as a code view keeping the source line numbers.
 */
export function TecanWorklist({
  gwl,
  toolbar,
}: TecanWorklistProps): ReactElement {
  const [showCommands, setShowCommands] = React.useState(false);

  const steps = parseGwl(gwl);

  return (
    <Space vertical style={{ width: '100%' }}>
      <Space>
        {toolbar}
        <Checkbox
          checked={showCommands}
          onChange={(event) => setShowCommands(event.target.checked)}
        >
          Befehle anzeigen
        </Checkbox>
      </Space>
      <div style={CODE_STYLE}>
        {steps.map((step) => (
          <GwlStepView
            key={step.lineNumber}
            step={step}
            showCommands={showCommands}
          />
        ))}
      </div>
    </Space>
  );
}
