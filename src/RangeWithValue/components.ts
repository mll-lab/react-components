import styled from 'styled-components';

import { PALETTE } from '../theme';

export const Container = styled.div`
  position: relative;
  padding: 30px 10px 10px;
`;

export const Scale = styled.div`
  height: 8px;
  background: ${(props) => props.theme.backgroundColor};
  border-radius: 4px;
  position: relative;
`;

export const RangeLine = styled.div<{ left: string }>`
  position: absolute;
  left: ${(props) => props.left};
  top: 6px;
  width: 1px;
  height: 10px;
  background: ${(props) => props.theme.borderColor};
`;

export const ValuePoint = styled.div<{
  left: string;
  width: number;
  color: string;
}>`
  position: absolute;
  left: ${(props) => props.left};
  top: -26px;
  width: ${(props) => props.width}px;
  height: 24px;
  border-radius: 8px;
  background: ${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${PALETTE.white};
  text-align: center;
`;

export const DownwardLine = styled.div<{
  color: string;
}>`
  position: absolute;
  left: 50%;
  top: 100%;
  transform: translateX(-50%);
  width: 2px;
  height: 7px;
  background: ${(props) => props.color};
`;

export const LabelWrapper = styled.div`
  position: relative;
  height: 18px;
`;

export const Label = styled.span<{ left: string }>`
  position: absolute;
  left: ${({ left }) => left};
  top: 9px;
  min-width: 28px;
  text-align: center;
  font-size: 12px;
`;
