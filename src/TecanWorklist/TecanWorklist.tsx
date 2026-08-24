import React, { CSSProperties, ReactElement, ReactNode } from 'react';
import styled from 'styled-components';

import { Card } from '../Card';
import { Checkbox } from '../Checkbox';
import { Space } from '../Space';

import { GwlStepView } from './GwlStepView';
import { parseGwl } from './parseGwl';

const CodeCard = styled(Card)`
  font-family: monospace;
`;

const CODE_BODY_STYLE: CSSProperties = {
  maxHeight: '400px',
  overflow: 'auto',
  padding: 0,
};

export const TECAN_WORKLIST_CODE_ID = 'tecan-worklist-code';

export type TecanWorklistProps = {
  gwl: string;
  toolbar?: ReactNode;
};

export function TecanWorklist({
  gwl,
  toolbar,
}: TecanWorklistProps): ReactElement {
  const [showCommands, setShowCommands] = React.useState(false);

  const steps = React.useMemo(() => parseGwl(gwl), [gwl]);

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
