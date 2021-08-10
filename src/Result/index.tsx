import { Result as AntdResult, ResultProps as AntdResultProps } from 'antd';
import React from 'react';

export const Result: typeof AntdResult = AntdResult;

export type ResultProps = AntdResultProps;

export function EntityNotFound(props: { entity: string; id: string }) {
  return (
    <Result
      status={'404'}
      title={
        <>
          {props.entity} {props.id} nicht gefunden.
        </>
      }
    />
  );
}
