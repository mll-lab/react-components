import React, { ReactElement } from 'react';
import styled from 'styled-components';

import { Typography } from '../Typography';
import { PALETTE } from '../theme';

import { Separator } from './Separator';
import { fieldStyle } from './fieldStyle';
import { COMMAND, GwlStep } from './parseGwl';

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

export function GwlStepView({
  step,
  showCommands,
}: {
  step: GwlStep;
  showCommands: boolean;
}): ReactElement {
  const isUndocumented = step.comment == null;

  return (
    <Step>
      {isUndocumented ? null : (
        <Line>
          <Gutter data-line-number={step.lineNumber} />
          {/* The C; prefix stays so a copied selection is valid GWL again. */}
          <Comment>
            <span
              style={fieldStyle({ role: 'command', text: COMMAND.COMMENT })}
            >
              {COMMAND.COMMENT}
            </span>
            <Separator />
            <Typography.Text strong>{step.comment}</Typography.Text>
          </Comment>
        </Line>
      )}
      {showCommands || isUndocumented
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
