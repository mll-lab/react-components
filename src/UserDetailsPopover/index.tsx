import { Modify } from '@mll-lab/js-utils';
import React, { PropsWithChildren, useEffect } from 'react';

import { Popover } from '../Popover';
import { Spinner } from '../Spinner';

import { UserDetails, UserDetailsProps } from './UserDetails';

export type UserDetailsPopoverProps = Modify<
  UserDetailsProps,
  {
    user?: UserDetailsProps['user'];
  }
> &
  PropsWithChildren<{
    loading: boolean;
    onOpen?: () => void;
  }>;

export function UserDetailsPopover({
  children,
  loading,
  onOpen,
  user,
}: UserDetailsPopoverProps) {
  return (
    <Popover
      destroyTooltipOnHide
      content={
        <UserDetailsPopoverContent
          loading={loading}
          onOpen={onOpen}
          user={user}
        />
      }
    >
      {children}
    </Popover>
  );
}

function UserDetailsPopoverContent({
  loading,
  onOpen,
  user,
}: Omit<UserDetailsPopoverProps, 'children'>) {
  useEffect(() => {
    // call once when popover opens to enable lazy loading of data
    onOpen?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Spinner spinning={loading}>{user && <UserDetails user={user} />}</Spinner>
  );
}
