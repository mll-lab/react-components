import { Spin } from 'antd';
import { SpinProps } from 'antd/es/spin';
import React, { ReactNode } from 'react';

import { MllSpinnerIcon } from './MllSpinnerIcon';

export * from './MllSpinnerIcon';

export type SpinnerProps = Omit<SpinProps, 'size' | 'tip'> & {
  size?: string;
  message?: string;
  children?: ReactNode;
};

export function Spinner({ message, size = '2em', ...spinProps }: SpinnerProps) {
  return (
    <div>
      {message && <h2 style={{ textAlign: 'center' }}>{message}</h2>}
      <Spin
        indicator={
          <MllSpinnerIcon
            style={{
              width: size,
            }}
          />
        }
        {...spinProps}
      />
    </div>
  );
}
