import {
  Skeleton as AntdSkeleton,
  SkeletonProps as AntdSkeletonProps,
} from 'antd';
import SkeletonAvatar from 'antd/lib/skeleton/Avatar';
import SkeletonButton from 'antd/lib/skeleton/Button';
import SkeletonImage from 'antd/lib/skeleton/Image';
import SkeletonInput from 'antd/lib/skeleton/Input';
import SkeletonNode from 'antd/lib/skeleton/Node';
import * as React from 'react';

// Copied from antd/lib/skeleton/Skeleton.d.ts to fix:
// Default export of the module has or is using private name 'CompoundedComponent'.
type CompoundedComponent = {
  Button: typeof SkeletonButton;
  Avatar: typeof SkeletonAvatar;
  Input: typeof SkeletonInput;
  Image: typeof SkeletonImage;
  Node: typeof SkeletonNode;
};

export const Skeleton: React.FC<SkeletonProps> & CompoundedComponent =
  AntdSkeleton;
export type SkeletonProps = AntdSkeletonProps;
