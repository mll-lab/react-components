import { joinNonEmpty } from '@mll-lab/js-utils';
import React, { useMemo } from 'react';

import { UserAvatar } from '../Avatar';
import { Divider } from '../Divider';
import { Col, Row } from '../Grid';
import { Space } from '../Space';
import { Typography } from '../Typography';

import { EmailRow } from './EmailRow';
import { GUTTER, SPACE } from './constants';

type User = {
  acronym?: string | null;
  email?: string | null;
  firstName?: string | null;
  inactive?: boolean;
  lastName?: string | null;
  userName: string;
};

export type UserDetailsProps = {
  user: User;
};

export function UserDetails({ user }: UserDetailsProps) {
  const { acronym, email, firstName, lastName, inactive, userName } = user;
  const fullName = useMemo(
    () => joinNonEmpty([firstName, lastName], ' '),
    [firstName, lastName],
  );
  const showFullName = !inactive && fullName;
  return (
    <Space direction="vertical" size={SPACE}>
      <Row gutter={GUTTER} align="middle">
        <Col flex="0 1 min-content">
          <UserAvatar username={acronym} />
        </Col>
        <Col flex="auto">
          {showFullName ? (
            <Space direction="vertical" size={0}>
              <Typography.Text strong>{fullName}</Typography.Text>
              <Typography.Text>{userName}</Typography.Text>
            </Space>
          ) : (
            <Typography.Text strong>{userName}</Typography.Text>
          )}
        </Col>
      </Row>

      <Divider style={{ marginTop: SPACE, marginBottom: SPACE }} />

      {inactive
        ? 'The user was deactivated'
        : email && <EmailRow email={email} />}
    </Space>
  );
}
