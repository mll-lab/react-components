import React, { PropsWithChildren, ReactNode } from 'react';

import { Col, Row } from '../Grid';

import { GUTTER } from './constants';

export function RowWithLabel({
  children,
  label,
}: PropsWithChildren<{ label: ReactNode }>) {
  return (
    <Row gutter={GUTTER} align="middle" wrap={false}>
      <Col flex="20px">{label}</Col>
      <Col flex="auto">{children}</Col>
    </Row>
  );
}
