import { Spin } from 'antd';
import * as React from 'react';
import { PropsWithChildren } from 'react';
import { useImageSize } from 'react-image-size';

import { MllSpinnerIcon } from '../Spinner';

export type ImageMapProps = PropsWithChildren<{
  src: string;
  onError?: (error: string) => void;
}>;

export function ImageMap(props: ImageMapProps) {
  const [dimensions, { loading, error }] = useImageSize(props.src);

  if (error) {
    props.onError?.(error);
  }

  if (dimensions == null) {
    return null;
  }

  return (
    <Spin
      spinning={loading}
      indicator={
        <MllSpinnerIcon
          style={{
            width: '2em',
          }}
        />
      }
    >
      <svg {...dimensions}>
        <defs>
          <pattern id="image" patternUnits="userSpaceOnUse" {...dimensions}>
            <image x="0" y="0" xlinkHref={props.src} />
          </pattern>
        </defs>

        <rect {...dimensions} fill="url(#image)" />

        {props.children}
      </svg>
      <br />
    </Spin>
  );
}
