import { PALETTE } from '../theme';

export function generalWellStyle() {
  return {
    backgroundColor: PALETTE.gray3,
    border: `1px solid ${PALETTE.gray4}`,
    borderRadius: 2,
    boxShadow: `0 0.5px 1.5px ${PALETTE.gray4}`,
    padding: 4,
  };
}
