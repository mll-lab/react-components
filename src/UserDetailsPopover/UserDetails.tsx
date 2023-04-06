import { MailOutlined } from '@ant-design/icons';
import { joinNonEmpty } from '@mll-lab/js-utils';
import React, { PropsWithChildren, ReactNode, useMemo } from 'react';

import { UserAvatar } from '../Avatar';
import { Divider } from '../Divider';
import { Col, Row } from '../Grid';
import { Link } from '../Link';
import { Space } from '../Space';
import { Typography } from '../Typography';

import { mailToLink } from './email';

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

const GUTTER = 8;
const SPACE = 4;

export function UserDetails({ user }: UserDetailsProps) {
  const { acronym, email, firstName, lastName, inactive, userName } = user;
  return (
    <Space direction="vertical" size={SPACE}>
      <Row gutter={GUTTER} align="middle">
        <Col flex="0 1 min-content">
          <UserAvatar username={acronym} />
        </Col>
        <Col flex="auto">
          <Space direction="vertical" size={0}>
            <Typography.Text strong>
              {inactive ? userName : joinNonEmpty([firstName, lastName], ' ')}
            </Typography.Text>
            {!inactive && <Typography.Text>{userName}</Typography.Text>}
          </Space>
        </Col>
      </Row>

      <Divider style={{ marginTop: SPACE, marginBottom: SPACE }} />

      {inactive ? 'The user was deactivated' : <EmailRow email={email} />}
    </Space>
  );
}

function EmailRow({ email }: Pick<User, 'email'>) {
  const emailLink = useMemo(() => (email ? mailToLink(email) : null), [email]);
  if (!email || !emailLink) {
    return null;
  }
  return (
    <RowWithLabel label={<MailOutlined />}>
      <Link href={emailLink}>{email}</Link>
    </RowWithLabel>
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
