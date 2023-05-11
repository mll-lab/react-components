import { PALETTE } from '../theme';

export const GENERAL_WELL_STYLE: {
  border: string;
  boxShadow: string;
  padding: number;
  backgroundColor: string;
  borderRadius: number;
} = {
  backgroundColor: PALETTE.gray3,
  border: `1px solid ${PALETTE.gray4}`,
  borderRadius: 2,
  boxShadow: `0 0.5px 1.5px ${PALETTE.gray4}`,
  padding: 4,
};
