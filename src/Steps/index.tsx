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
    top: -7%;
    font-size: 0.95em;
  }
  .mll-ant-steps-item-title {
    font-size: 1em;
    .mll-ant-steps-item-subtitle {
      font-size: 0.92em;
    }
  }
  .mll-ant-steps-item-description {
    font-size: 0.95em;
  }
`;
