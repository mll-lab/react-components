import styled from 'styled-components';

import { Table } from '../Table';
import { PALETTE } from '../theme';

export const TOTAL_VOLUME_ROW_CLASS = 'total-volume-row';
export const MASTER_MIX_END_ROW_CLASS = 'master-mix-end-row';
export const PIPETTED_ROW_CLASS = 'pipetted-row';
export const REFERENCE_VOLUME_CLASS = 'reference-volume';

export const VolumeTable = styled(Table)`
  .${TOTAL_VOLUME_ROW_CLASS} {
    background-color: ${PALETTE.gray3};
    font-weight: bold;
  }

  /* Closes the master mix, so that what follows reads as added per reaction. */
  .mll-ant-table-tbody > tr.${MASTER_MIX_END_ROW_CLASS} > td {
    border-bottom: 2px solid ${PALETTE.gray5};
  }

  .${PIPETTED_ROW_CLASS} {
    color: ${PALETTE.gray6};
  }

  /* Volumes for a single reaction only serve as a reference where a scaled column exists. */
  .${REFERENCE_VOLUME_CLASS} {
    color: ${PALETTE.gray6};
  }
`;
