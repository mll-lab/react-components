# @mll-lab/react-components

[![npm](https://img.shields.io/npm/v/@mll-lab/react-components)](https://www.npmjs.com/package/@mll-lab/react-components)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

Shared React components of MLL

[Try it out](https://mll-lab.github.io/react-components)

## Install

    yarn add @mll-lab/react-components

## Usage

To set up proper styles, wrap your application in `<Provider>`:

```tsx
import { Provider } from '@mll-lab/react-components';
import * as React from 'react';
import { render } from 'react-dom';

render(
    <Provider>
        <App />
    </Provider>,
    document.getElementById('app'),
);
```

Optionally, you may pass a theme:

```tsx
<Provider theme={{ backgroundColor: 'purple' }}>
```
