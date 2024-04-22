import { Modify } from '@mll-lab/js-utils';
import React, { PropsWithChildren } from 'react';

import { UserAvatar } from '../Avatar';
import { Popover, PopoverProps } from '../Popover';

import { UserDetails, UserDetailsProps } from './UserDetails';

export type UserDetailsPopoverProps = Modify<
  UserDetailsProps,
  {
    /** Can be empty while loading. */
    user: UserDetailsProps['user'] | undefined | null;
  }
> &
  PropsWithChildren<{
    popover: Modify<
      Omit<PopoverProps, 'content'>,
      { onVisibleChange: PopoverProps['onVisibleChange'] }
    >;
  }>;

export function UserDetailsPopover({
  children,
  popover,
  user,
}: UserDetailsPopoverProps) {
  return (
    <Popover
      destroyTooltipOnHide
      mouseEnterDelay={0.8}
      {...popover}
      content={<UserDetailsPopoverContent user={user} />}
      overlayStyle={{
        // hide overlay while user is loading to avoid janky UI
        display: user ? undefined : 'none',
        ...popover.overlayStyle,
      }}
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
  user,
}: Pick<UserDetailsPopoverProps, 'user'>) {
  if (!user) {
    return null;
  }
  return <UserDetails user={user} />;
}
