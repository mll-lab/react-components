import React from 'react';

export function ColumnLabel({ column }: { column: number }) {
  return (
    <span
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '4px',
      }}
    >
      <strong>{column}</strong>
    </span>
  );
}
