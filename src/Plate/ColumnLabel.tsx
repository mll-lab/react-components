import React from 'react';

export function ColumnLabel({ column }: { column: number }) {
  return (
    <span
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: 4,
      }}
    >
      <strong>{column}</strong>
    </span>
  );
}
