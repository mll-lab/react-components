import 'styled-components';

import { Theme } from './theme';

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  export interface DefaultTheme extends Theme {}
}
