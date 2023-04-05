import { MailOutlined } from '@ant-design/icons';
import React, { PropsWithChildren, ReactNode, useMemo } from 'react';

import { UserAvatar } from '../Avatar';
import { Divider } from '../Divider';
import { Col, Row } from '../Grid';
import { Space } from '../Space';
import { Typography } from '../Typography';

import { mailToLink } from './email';

type User = {
  acronym: string;
  email: string;
  firstName: string;
  inactive?: boolean;
  lastName: string;
  userName: string;
};

export type UserDetailsProps = PropsWithChildren<{
  user: User;
}>;

const GUTTER = 8;
const SPACE = 4;

export function UserDetails({
  children,
  user: { acronym, email, firstName, lastName, inactive, userName },
}: UserDetailsProps) {
  const emailLink = useMemo(() => mailToLink(email), [email]);

  return (
    <Space direction="vertical" size={SPACE}>
      <Row gutter={GUTTER} align="middle">
        <Col flex="0 1 min-content">
          <UserAvatar username={acronym} />
        </Col>
        <Col flex="auto">
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Typography.Text strong>
              {inactive ? userName : [firstName, lastName].join(' ')}
            </Typography.Text>
            {!inactive && <Typography.Text>{userName}</Typography.Text>}
          </div>
        </Col>
      </Row>

      <Divider style={{ marginTop: 4, marginBottom: 4 }} />

      <RowWithLabel label={<MailOutlined />}>
        <a href={emailLink}>{email}</a>
      </RowWithLabel>

      {children}
    </Space>
  );
}

function RowWithLabel({
  children,
  label,
}: PropsWithChildren<{ label: ReactNode }>) {
  return (
    <Row gutter={GUTTER} align="middle">
      <Col flex="20px">{label}</Col>
      <Col flex="auto">{children}</Col>
    </Row>
  );
}
