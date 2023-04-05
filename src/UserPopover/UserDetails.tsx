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

export type UserDetailsProps = {
  loading?: boolean;
  formatMailToLink?: (user: User) => string;
  user: User;
};

const GUTTER = 8;
const SPACE = 4;

export function UserDetails({ loading, user, ...props }: UserDetailsProps) {
  const emailLink = useMemo(
    () =>
      props.formatMailToLink
        ? props.formatMailToLink(user)
        : mailToLink(user.email),
    [props, user],
  );

  return (
    <Space direction="vertical" size={SPACE}>
      <Row gutter={GUTTER} align="middle">
        <Col flex="0 1 min-content">
          <UserAvatar username={user.acronym} />
        </Col>
        <Col flex="auto">
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Typography.Text strong>
              {user.inactive
                ? user.userName
                : [user.firstName, user.lastName].join(' ')}
            </Typography.Text>
            {!user.inactive && (
              <Typography.Text>{user.userName}</Typography.Text>
            )}
          </div>
        </Col>
      </Row>

      <Divider style={{ marginTop: 4, marginBottom: 4 }} />

      <UserDetailRow label={<MailOutlined />}>
        <a href={emailLink}>{user.email}</a>
      </UserDetailRow>
    </Space>
  );
}

function UserDetailRow({
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
