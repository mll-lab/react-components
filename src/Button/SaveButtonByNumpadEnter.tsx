import * as React from 'react';
import { Component } from 'react';
import { GlobalHotKeys, configure } from 'react-hotkeys';

import { ColoredButtonType } from './ColoredButtons';

import { SaveButton } from './index';

export type SaveButtonByNumpadEnterProps = {
  onClick: React.MouseEventHandler;
  isSaving?: boolean;
};

configure({
  ignoreTags: [],
  ignoreEventsCondition: () => false,
});

export class SaveButtonByNumpadEnter extends Component<SaveButtonByNumpadEnterProps> {
  buttonRef: ColoredButtonType | undefined;

  dispatchClick = (event?: KeyboardEvent) => {
    if (!event) {
      return;
    }

    if (event.location !== KeyboardEvent.DOM_KEY_LOCATION_NUMPAD) {
      return;
    }

    if (this.buttonRef) {
      // @ts-expect-error buttonNode is a private property
      this.buttonRef.buttonNode.click();
      event.preventDefault();
    }
  };

  render() {
    return (
      <GlobalHotKeys
        keyMap={{ DISPATCH_CLICK: 'enter' }}
        handlers={{ DISPATCH_CLICK: this.dispatchClick }}
      >
        <SaveButton
          block
          loading={this.props.isSaving}
          onClick={this.props.onClick}
          ref={(element) => {
            this.buttonRef = element ?? undefined;
          }}
        />
      </GlobalHotKeys>
    );
  }
}
