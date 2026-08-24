import React, { CSSProperties, ReactElement, ReactNode } from 'react';
import styled from 'styled-components';

import { Card } from '../Card';
import { Checkbox } from '../Checkbox';
import { Space } from '../Space';
import { Typography } from '../Typography';
import { PALETTE } from '../theme';

import { GwlField, GwlFieldRole, GwlStep, parseGwl } from './parseGwl';

/** Only pipetting commands get a color, the rest merely keeps the robot going. */
const COMMAND_COLOR: Record<string, string> = {
  A: PALETTE.red, // Aspirate
  D: PALETTE.gold, // Dispense
  R: PALETTE.blue, // ReagentDistribution
};

const FIELD_STYLE: Record<GwlFieldRole, CSSProperties> = {
  command: { fontWeight: 'bold' },
  plain: { color: PALETTE.gray6 },
  position: { color: PALETTE.tableHeaderBackgroundColor, fontWeight: 'bold' },
  tubeID: { color: PALETTE.gray9, fontWeight: 'bold' },
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

const CodeCard = styled(Card)`
  font-family: monospace;
`;

const CODE_BODY_STYLE: CSSProperties = {
  maxHeight: '400px',
  overflow: 'auto',
  padding: 0,
};

const Step = styled.div`
  padding-bottom: 4px;
`;

const Line = styled.div`
  display: flex;
  white-space: pre;
`;

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

const Comment = styled.span`
  padding-left: 8px;
`;

const Command = styled.span`
  border-left: 2px solid ${PALETTE.gray3};
  margin-left: 8px;
  padding-left: 10px;
`;

function Separator(): ReactElement {
  return <Typography.Text type="secondary">;</Typography.Text>;
}

export const TECAN_WORKLIST_CODE_ID = 'tecan-worklist-code';

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
    <Step>
      {step.comment == null ? null : (
        <Line>
          <Gutter data-line-number={step.lineNumber} />
          {/* The C; prefix stays so a copied selection is valid GWL again. */}
          <Comment>
            <span style={fieldStyle({ role: 'command', text: 'C' })}>C</span>
            <Separator />
            <Typography.Text strong>{step.comment}</Typography.Text>
          </Comment>
        </Line>
      )}
      {/* An undocumented step has no comment to collapse into, so it always shows. */}
      {showCommands || step.comment == null
        ? step.commands.map((command) => (
            <Line key={command.lineNumber}>
              <Gutter data-line-number={command.lineNumber} />
              <Command>
                {command.fields.map((field, index) => (
                  // A field is identified by its position, fields never reorder.
                  // eslint-disable-next-line react/no-array-index-key
                  <React.Fragment key={index}>
                    {index === 0 ? null : <Separator />}
                    <span style={fieldStyle(field)}>{field.text}</span>
                  </React.Fragment>
                ))}
              </Command>
            </Line>
          ))
        : null}
    </Step>
  );
}

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
      <CodeCard
        size="small"
        id={TECAN_WORKLIST_CODE_ID}
        bodyStyle={CODE_BODY_STYLE}
      >
        {steps.map((step) => (
          <GwlStepView
            key={step.lineNumber}
            step={step}
            showCommands={showCommands}
          />
        ))}
      </CodeCard>
    </Space>
  );
}
