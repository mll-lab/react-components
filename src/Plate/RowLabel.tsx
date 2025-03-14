import React from 'react';

export function RowLabel({ row }: { row: string }) {
  return (
    <span
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <strong>{row}</strong>
    </span>
  );
}
