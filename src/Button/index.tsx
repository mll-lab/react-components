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

import { MllTheme, useMllTheme } from '../theme';

import {
  ColoredButtonProps,
  ColoredButtonType,
  FilledButton,
  GhostButton,
} from './ColoredButtons';

export * from './SaveButtonByNumpadEnter';

export type ButtonProps = {
  filled?: boolean;
  dashed?: boolean;
} & Omit<ColoredButtonProps, 'type'>;

function ButtonVariousTypes(
  { filled, dashed, ...rest }: ButtonProps,
  ref: Ref<ColoredButtonType & HTMLElement>,
) {
  if (dashed) {
    return <GhostButton type="dashed" ref={ref} {...rest} />;
  }

  if (filled) {
    return <FilledButton ref={ref} {...rest} />;
  }

  return <GhostButton ref={ref} {...rest} />;
}

export const Button = React.forwardRef<
  ColoredButtonType & HTMLElement,
  ButtonProps
>(ButtonVariousTypes);

function makeSpecializedButton({
  children: defaultChildren,
  colorFromTheme,
  ...defaults
}: Partial<ButtonProps> & {
  colorFromTheme: (theme: MllTheme) => string;
}) {
  const ButtonWithRef = (
    { children, ...rest }: ButtonProps,
    ref: Ref<ColoredButtonType & HTMLElement>,
  ) => {
    const theme = useMllTheme();
    const color = colorFromTheme ? { color: colorFromTheme(theme) } : {};

    return (
      <Button ref={ref} {...defaults} {...color} {...rest}>
        {children ?? defaultChildren}
      </Button>
    );
  };

  return React.forwardRef<ColoredButtonType & HTMLElement, ButtonProps>(
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
