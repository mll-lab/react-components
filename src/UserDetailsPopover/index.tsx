import { Modify } from '@mll-lab/js-utils';
import React, { PropsWithChildren, useEffect } from 'react';

import { UserAvatar } from '../Avatar';
import { Popover } from '../Popover';

import { UserDetails, UserDetailsProps } from './UserDetails';

export type UserDetailsPopoverProps = Modify<
  UserDetailsProps,
  {
    /** Can be empty while loading. */
    user: UserDetailsProps['user'] | undefined | null;
  }
> &
  PropsWithChildren<{
    /** Called once when popover opens to enable lazy loading of data. */
    onOpen?: () => void;
  }>;

export function UserDetailsPopover({
  children,
  onOpen,
  user,
}: UserDetailsPopoverProps) {
  return (
    <Popover
      destroyTooltipOnHide
      mouseEnterDelay={1}
      content={<UserDetailsPopoverContent onOpen={onOpen} user={user} />}
      // hide popover while user is loading
      visible={!user ? false : undefined}
    >
      {children}
    </Popover>
  );
}

export function UserAvatarWithDetailsPopover(
  props: Omit<UserDetailsPopoverProps, 'children'> & {
    acronym: string | null | undefined;
  },
) {
  return (
    <UserDetailsPopover {...props}>
      <UserAvatar username={props.acronym} />
    </UserDetailsPopover>
  );
}

function UserDetailsPopoverContent({
  onOpen,
  user,
}: Omit<UserDetailsPopoverProps, 'children'>) {
  useEffect(() => {
    // call once when popover opens to enable lazy loading of data
    onOpen?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!user) {
    return null;
  }
  return <UserDetails user={user} />;
}
