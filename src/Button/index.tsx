import {
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  ExportOutlined,
  PlusOutlined,
  RollbackOutlined,
  SaveOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import * as React from 'react';
import { Ref } from 'react';

import { Theme, useTheme } from '../theme';

import {
  ColoredButtonProps,
  ColoredButtonType,
  FilledButton,
  GhostButton,
} from './ColoredButtons';

export * from './SaveButtonByNumpadEnter';

export type ButtonProps = {
  dashed?: boolean;
  filled?: boolean;
  iconOnly?: boolean;
} & Omit<ColoredButtonProps, 'type'>;

export type ButtonRef = ColoredButtonType & HTMLElement;

function ButtonVariousTypes(
  { children, dashed, filled, iconOnly, ...rest }: ButtonProps,
  ref: Ref<ButtonRef>,
) {
  const childrenToRender = iconOnly === true ? null : children;

  if (dashed) {
    return (
      <GhostButton type="dashed" ref={ref} {...rest}>
        {childrenToRender}
      </GhostButton>
    );
  }

  if (filled) {
    return (
      <FilledButton ref={ref} {...rest}>
        {childrenToRender}
      </FilledButton>
    );
  }

  return (
    <GhostButton ref={ref} {...rest}>
      {childrenToRender}
    </GhostButton>
  );
}

export const Button = React.forwardRef<
  ButtonRef,
  ButtonProps
>(ButtonVariousTypes);

function makeSpecializedButton({
  children: defaultChildren,
  colorFromTheme,
  ...defaults
}: Partial<ButtonProps> & {
  colorFromTheme: (theme: Theme) => string;
}) {
  const ButtonWithRef = (
    { children, ...rest }: ButtonProps,
    ref: Ref<ButtonRef>,
  ) => {
    const theme = useTheme();
    const color = colorFromTheme ? { color: colorFromTheme(theme) } : {};

    return (
      <Button ref={ref} {...defaults} {...color} {...rest}>
        {children ?? defaultChildren}
      </Button>
    );
  };

  return React.forwardRef<ButtonRef, ButtonProps>(
    ButtonWithRef,
  );
}

export const CreateButton = makeSpecializedButton({
  colorFromTheme: (theme) => theme.successColor,
  icon: <PlusOutlined />,
  children: 'Hinzufügen',
});

export const SaveButton = makeSpecializedButton({
  colorFromTheme: (theme) => theme.successColor,
  icon: <SaveOutlined />,
  children: 'Speichern',
});

export const EditButton = makeSpecializedButton({
  colorFromTheme: (theme) => theme.borderColor,
  icon: <EditOutlined />,
  children: 'Bearbeiten',
});

export const InfoButton = makeSpecializedButton({
  colorFromTheme: (theme) => theme.infoColor,
});

export const WarningButton = makeSpecializedButton({
  colorFromTheme: (theme) => theme.warningColor,
  icon: <WarningOutlined />,
});

export const CancelButton = makeSpecializedButton({
  colorFromTheme: (theme) => theme.errorColor,
  icon: <CloseOutlined />,
  children: 'Abbrechen',
});

export const ResetButton = makeSpecializedButton({
  colorFromTheme: (theme) => theme.errorColor,
  icon: <RollbackOutlined />,
  children: 'Zurücksetzen',
});

export const DeleteButton = makeSpecializedButton({
  colorFromTheme: (theme) => theme.errorColor,
  icon: <DeleteOutlined />,
  children: 'Löschen',
});

export const SendButton = makeSpecializedButton({
  colorFromTheme: (theme) => theme.successColor,
  icon: <ExportOutlined />,
  children: 'Senden',
});
