import { Modify } from '@mll-lab/js-utils';
import { Popover } from 'antd';
import React, { PropsWithChildren } from 'react';

import { Spinner } from '../Spinner';

import { UserDetails, UserDetailsProps } from './UserDetails';

export type UserPopoverProps = Modify<
  UserDetailsProps,
  {
    user?: UserDetailsProps['user'];
  }
> &
  PropsWithChildren<{
    loading: boolean;
  }>;

export function UserPopover({ children, loading, user }: UserPopoverProps) {
  return (
    <Popover
      destroyTooltipOnHide
      content={<UserPopoverContent loading={loading} user={user} />}
    >
      {children}
    </Popover>
  );
}

function UserPopoverContent({ user, loading }: UserPopoverProps) {
  return (
    <Spinner spinning={loading}>{user && <UserDetails user={user} />}</Spinner>
  );
}
