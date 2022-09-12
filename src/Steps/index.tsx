import {
  Steps as AntdSteps,
  StepsProps as AntdStepsProps,
  StepProps as AntdStepProps,
} from 'antd';
import styled from 'styled-components';

import { fontSizeFromTheme } from '../styled-utils';

export type StepsProps = AntdStepsProps;
export type StepProps = AntdStepProps;

export const Steps: typeof AntdSteps = styled(AntdSteps)`
  font-size: ${fontSizeFromTheme};

  .mll-ant-steps-icon {
    top: -5%;
  }
`;
