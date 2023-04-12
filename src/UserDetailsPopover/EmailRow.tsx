import { MailOutlined } from '@ant-design/icons';
import React from 'react';

import { Anchor } from '../Anchor';

import { RowWithLabel } from './RowWithLabel';
import { mailToLink } from './email';

type EmailRowProps = {
  email: string;
};

export function EmailRow({ email }: EmailRowProps) {
  return (
    <RowWithLabel label={<MailOutlined />}>
      <Anchor href={mailToLink(email)}>{email}</Anchor>
    </RowWithLabel>
  );
}
