import { PALETTE } from '../theme';
import {CSSProperties} from "react";

export const GENERAL_WELL_STYLE: CSSProperties  = {
  backgroundColor: PALETTE.gray3,
  border: `1px solid ${PALETTE.gray4}`,
  borderRadius: 2,
  boxShadow: `0 0.5px 1.5px ${PALETTE.gray4}`,
  padding: 4,
};
