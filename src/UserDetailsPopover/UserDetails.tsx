import { joinNonEmpty } from '@mll-lab/js-utils';
import React from 'react';

import { UserAvatar } from '../Avatar';
import { Divider } from '../Divider';
import { Col, Row } from '../RowCol';
import { Space } from '../Space';
import { Typography } from '../Typography';

import { EmailRow } from './EmailRow';
import { PhoneRow } from './PhoneRow';
import { GUTTER, SPACE } from './constants';

type User = {
  acronym?: string | null;
  email?: string | null;
  firstname?: string | null;
  inactive?: boolean;
  lastname?: string | null;
  phone?: string | null;
  username: string;
};

export type UserDetailsProps = {
  user: User;
};

export function UserDetails({ user }: UserDetailsProps) {
  const { acronym, email, firstname, lastname, inactive, username, phone } =
    user;
  const fullName = joinNonEmpty([firstname, lastname], ' ');
  const showFullName = !inactive && fullName;
  return (
    <Space vertical size={SPACE}>
      <Row gutter={GUTTER} align="middle">
        <Col flex="0 1 min-content">
          <UserAvatar username={acronym} />
        </Col>
        <Col
          flex="auto"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          {showFullName ? (
            <>
              <Typography.Text strong>{fullName}</Typography.Text>
              <Typography.Text>{username}</Typography.Text>
            </>
          ) : (
            <Typography.Text strong>{username}</Typography.Text>
          )}
        </Col>
      </Row>

      <Divider style={{ marginTop: SPACE, marginBottom: SPACE }} />

      {inactive ? (
        'The user was deactivated'
      ) : (
        <>
          {email && <EmailRow email={email} />}
          {phone && <PhoneRow phone={phone} />}
        </>
      )}
    </Space>
  );
}
