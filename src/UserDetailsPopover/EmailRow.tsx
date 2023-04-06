import { MailOutlined } from '@ant-design/icons';
import React, { useMemo } from 'react';

import { Link } from '../Link';

import { RowWithLabel } from './RowWithLabel';
import { mailToLink } from './email';

type EmailRowProps = {
  email: string;
};

export function EmailRow({ email }: EmailRowProps) {
  const emailLink = useMemo(() => mailToLink(email), [email]);
  return (
    <RowWithLabel label={<MailOutlined />}>
      <Link href={emailLink}>{email}</Link>
    </RowWithLabel>
  );
}
