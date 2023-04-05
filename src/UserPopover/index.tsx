import { Modify } from '@mll-lab/js-utils';
import { Popover } from 'antd';
import React, { PropsWithChildren, useEffect } from 'react';

import { Spinner } from '../Spinner';

import { UserDetails, UserDetailsProps } from './UserDetails';

export type UserPopoverProps = Modify<
  UserDetailsProps,
  {
    user?: UserDetailsProps['user'];
  }
> &
  PropsWithChildren<{
    onOpen?: () => void;
    open?: boolean;
  }>;

export function UserPopover({
  children,
  formatMailToLink,
  loading,
  onOpen,
  open,
  user,
}: UserPopoverProps) {
  return (
    <Popover
      destroyTooltipOnHide
      content={
        <UserPopoverContent
          formatMailToLink={formatMailToLink}
          loading={loading}
          onOpen={onOpen}
          user={user}
        />
      }
      visible={open}
    >
      {children}
    </Popover>
  );
}

function UserPopoverContent({ user, loading, onOpen }: UserPopoverProps) {
  useEffect(() => {
    onOpen?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Spinner spinning={loading}>
      {user && <UserDetails loading={loading} user={user} />}
    </Spinner>
  );
}
