import styled from 'styled-components';

import { Table } from '../Table';
import { PALETTE } from '../theme';

export const TOTAL_VOLUME_ROW_CLASS = 'total-volume-row';
export const MASTER_MIX_BLOCK_ROW_CLASS = 'master-mix-block-row';
export const MASTER_MIX_END_ROW_CLASS = 'master-mix-end-row';
export const SECTION_ROW_CLASS = 'section-row';
export const PIPETTED_ROW_CLASS = 'pipetted-row';
export const UNCLICKABLE_ROW_CLASS = 'unclickable-row';
export const REFERENCE_VOLUME_CLASS = 'reference-volume';

/**
 * The width is set by the surrounding container, since antd wins the specificity tie for
 * `max-width` on `.mll-ant-table-wrapper`.
 */
export const VolumeTable = styled(Table)`
  .${TOTAL_VOLUME_ROW_CLASS} {
    background-color: ${PALETTE.gray3};
  }

  .${TOTAL_VOLUME_ROW_CLASS}, .${SECTION_ROW_CLASS} {
    font-weight: bold;
  }

  /* Left edge of the box that holds the master mix, from its label down to its total. */
  .mll-ant-table-tbody > tr.${MASTER_MIX_BLOCK_ROW_CLASS} > td:first-child {
    position: relative;
  }

  /*
   * Overlaps the gap between the row boxes, which a border per row would leave open.
   * Both edges of the box share one gray, since dividerColor vanishes on the total row.
   */
  .mll-ant-table-tbody
    > tr.${MASTER_MIX_BLOCK_ROW_CLASS}
    > td:first-child::before {
    content: '';
    position: absolute;
    top: -1px;
    bottom: -1px;
    left: 0;
    width: 2px;
    background-color: ${PALETTE.gray5};
  }

  /* Closes the master mix, so that what follows reads as added per reaction. */
  .mll-ant-table-tbody > tr.${MASTER_MIX_END_ROW_CLASS} > td {
    border-bottom: 2px solid ${PALETTE.gray5};
  }

  .mll-ant-table-tbody > tr.${MASTER_MIX_END_ROW_CLASS} + tr > td {
    padding-top: 16px;
  }

  .${PIPETTED_ROW_CLASS} {
    color: ${PALETTE.gray6};
  }

  /* Volumes for a single reaction only serve as a reference where a scaled column exists. */
  .${REFERENCE_VOLUME_CLASS} {
    color: ${PALETTE.gray6};
  }

  /* Table sets a pointer cursor on every row as soon as any row is clickable. */
  .${UNCLICKABLE_ROW_CLASS}:hover {
    cursor: default;
  }
`;
