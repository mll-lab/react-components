// TODO remove when we can upgrade to @testing-library/user-event:14, which currently does not work with Select
/* eslint-disable @typescript-eslint/await-thenable */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { Provider } from '../Provider';

import { TecanWorklistPreview } from './TecanWorklistPreview';
import { DILUTION_RUN_WORKLIST } from './exampleWorklist';

const TIP_COUNT_OPTIONS = [
  { tipCount: 4, device: 'A' },
  { tipCount: 8, device: 'E' },
];

describe('TecanWorklistPreview', () => {
  it('offers tip counts and reports the device serving the chosen one', async () => {
    const onDeviceChange = jest.fn();

    render(
      <Provider>
        <TecanWorklistPreview
          gwl={DILUTION_RUN_WORKLIST}
          device="A"
          tipCountOptions={TIP_COUNT_OPTIONS}
          onDeviceChange={onDeviceChange}
        />
      </Provider>,
    );

    await userEvent.click(screen.getByRole('combobox'));
    await userEvent.click(screen.getByText('8 Tip'));

    expect(onDeviceChange).toHaveBeenCalledWith('E');
  });
});
