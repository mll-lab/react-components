import { Modify } from '@mll-lab/js-utils';
import React, { PropsWithChildren, useEffect } from 'react';

import { UserAvatar } from '../Avatar';
import { Popover } from '../Popover';
import { Spinner } from '../Spinner';

import { UserDetails, UserDetailsProps } from './UserDetails';

export type UserDetailsPopoverProps = Modify<
  UserDetailsProps,
  {
    user: UserDetailsProps['user'] | undefined | null; // can be empty while loading
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

export function UserAvatarWithDetailsPopover(
  props: Omit<UserDetailsPopoverProps, 'children'>,
) {
  return (
    <UserDetailsPopover {...props}>
      <UserAvatar username={props.user?.acronym} />
    </UserDetailsPopover>
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
