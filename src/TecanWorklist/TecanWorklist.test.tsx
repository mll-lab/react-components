// TODO remove when we can upgrade to @testing-library/user-event:14, whose events actually are awaitable
/* eslint-disable @typescript-eslint/await-thenable */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { Provider } from '../Provider';

import { TecanWorklist, TECAN_WORKLIST_CODE_ID } from './TecanWorklist';
import { DILUTION_RUN_WORKLIST } from './exampleWorklist';

const SHOW_COMMANDS_LABEL = 'Befehle anzeigen';

describe('TecanWorklist', () => {
  it('leads with the comments, holding the commands back until asked for and again after', async () => {
    render(
      <Provider>
        <TecanWorklist gwl={DILUTION_RUN_WORKLIST} />
      </Provider>,
    );

    expect(screen.getByText('User: mustermann')).toBeInTheDocument();
    expect(screen.queryByText('198')).not.toBeInTheDocument();

    await userEvent.click(screen.getByLabelText(SHOW_COMMANDS_LABEL));

    expect(screen.getAllByText('198')).toHaveLength(10);

    await userEvent.click(screen.getByLabelText(SHOW_COMMANDS_LABEL));

    expect(screen.queryByText('198')).not.toBeInTheDocument();
  });

  it('shows the commands of a worklist documenting nothing, which has no comment to collapse into', () => {
    render(
      <Provider>
        <TecanWorklist gwl={'B;\nA;MM;;Eppis;1;;198;;;1\nW;'} />
      </Provider>,
    );

    expect(screen.getByTestId(TECAN_WORKLIST_CODE_ID).textContent).toBe(
      'B;A;MM;;Eppis;1;;198;;;1W;',
    );
  });

  it('keeps the line numbers out of the text, so a copied selection stays valid GWL', async () => {
    render(
      <Provider>
        <TecanWorklist gwl={'C;Transfer\nA;MM;;Eppis;1;;198;;;1\nW;'} />
      </Provider>,
    );
    await userEvent.click(screen.getByLabelText(SHOW_COMMANDS_LABEL));

    expect(screen.getByTestId(TECAN_WORKLIST_CODE_ID).textContent).toBe(
      'C;TransferA;MM;;Eppis;1;;198;;;1W;',
    );
  });
});
