import styled from 'styled-components';

import { Table } from '../Table';

export const TOTAL_VOLUME_ROW_CLASS = 'total-volume-row';

/** Basis of both the master mix and the reaction table, so they look and align the same. */
export const VolumeTable = styled(Table)`
  max-width: 400px;

  .${TOTAL_VOLUME_ROW_CLASS} {
    background-color: lightgrey;
  }
`;
