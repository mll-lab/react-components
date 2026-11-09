import { render, screen } from '@testing-library/react';
import React from 'react';

import { FilledButton } from '../Button/ColoredButtons';
import { DatePicker } from '../DatePicker';
import { Modal } from '../Modal';

import { PrefixProvider, Provider } from './index';

function unprefixedAntdClasses(container: HTMLElement): Array<string> {
  return Array.from(container.querySelectorAll('[class]')).flatMap((element) =>
    Array.from(element.classList).filter((name) => name.startsWith('ant-')),
  );
}

describe('<Provider />', () => {
  it('prefixes components that import antd from a subpath', () => {
    const { container } = render(
      <Provider>
        <FilledButton>Speichern</FilledButton>
        <DatePicker />
      </Provider>,
    );

    expect(unprefixedAntdClasses(container)).toEqual([]);
  });

  it('localizes components that import antd from a subpath', () => {
    render(
      <Provider>
        <DatePicker />
      </Provider>,
    );

    expect(screen.getByPlaceholderText('Datum auswählen')).toBeInTheDocument();
  });
});

describe('<PrefixProvider />', () => {
  it('prefixes components', () => {
    const { container } = render(
      <PrefixProvider>
        <FilledButton>Speichern</FilledButton>
        <DatePicker />
      </PrefixProvider>,
    );

    expect(unprefixedAntdClasses(container)).toEqual([]);
  });

  it('keeps the locale of a surrounding <Provider> once it unmounts', () => {
    render(<Provider />);
    render(<PrefixProvider />).unmount();

    render(<Modal visible />);

    expect(
      screen.getByRole('button', { name: 'Abbrechen' }),
    ).toBeInTheDocument();
  });
});
