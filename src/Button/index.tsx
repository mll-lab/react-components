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

import { useLayoutContext } from '../LayoutProvider';
import { Theme, useTheme } from '../theme';

import {
  CustomizableButtonProps,
  ColoredButtonType,
  FilledButton,
  GhostButton,
} from './ColoredButtons';

export * from './SaveButtonByNumpadEnter';

export type ButtonProps = {
  dashed?: boolean;
  filled?: boolean;
  iconOnly?: boolean;
} & Omit<CustomizableButtonProps, 'type'>;

function ButtonVariousTypes(
  { children, dashed, filled, iconOnly, size: propSize, ...rest }: ButtonProps,
  ref: Ref<ColoredButtonType & HTMLElement>,
) {
  const context = useLayoutContext();

  const { layout } = context;

  const size = propSize || layout.size;

  const childrenToRender = iconOnly === true ? null : children;

  if (dashed) {
    return (
      <GhostButton
        type="dashed"
        ref={ref}
        size={size}
        fontSize={layout.fontSize}
        {...rest}
      >
        {childrenToRender}
      </GhostButton>
    );
  }

  if (filled) {
    return (
      <FilledButton ref={ref} size={size} fontSize={layout.fontSize} {...rest}>
        {childrenToRender}
      </FilledButton>
    );
  }

  return (
    <GhostButton ref={ref} size={size} fontSize={layout.fontSize} {...rest}>
      {childrenToRender}
    </GhostButton>
  );
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
  colorFromTheme: (theme: Theme) => string;
}) {
  const ButtonWithRef = (
    { children, ...rest }: ButtonProps,
    ref: Ref<ColoredButtonType & HTMLElement>,
  ) => {
    const theme = useTheme();
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
