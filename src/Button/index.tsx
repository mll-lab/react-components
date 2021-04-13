import {
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  ExportOutlined,
  PlusOutlined,
  SaveOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import * as React from 'react';
import { Ref } from 'react';

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
  ref: Ref<ColoredButtonType>,
) {
  // We are forced to add ts-ignore because styled-components does reportedly not
  // expose the "ref" prop on wrapped components - it actually forwards it though.
  // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/28884

  if (dashed) {
    // @ts-ignore
    return <GhostButton type="dashed" ref={ref} {...rest} />;
  }

  if (filled) {
    // @ts-ignore
    return <FilledButton ref={ref} {...rest} />;
  }

  // @ts-ignore
  return <GhostButton ref={ref} {...rest} />;
}

export const Button = React.forwardRef<ColoredButtonType, ButtonProps>(
  ButtonVariousTypes,
);

function makeSpecializedButton({
  children: defaultChildren,
  ...defaults
}: Partial<ButtonProps>) {
  const ButtonWithRef = (
    { children, ...rest }: ButtonProps,
    ref: Ref<ColoredButtonType>,
  ) => (
    <Button ref={ref} {...defaults} {...rest}>
      {children ?? defaultChildren}
    </Button>
  );

  return React.forwardRef<ColoredButtonType, ButtonProps>(ButtonWithRef);
}

export const CreateButton = makeSpecializedButton({
  color: 'green',
  icon: <PlusOutlined />,
  children: 'Hinzufügen',
});

export const SaveButton = makeSpecializedButton({
  color: 'green',
  icon: <SaveOutlined />,
  children: 'Speichern',
});

export const EditButton = makeSpecializedButton({
  icon: <EditOutlined />,
  children: 'Bearbeiten',
});

export const InfoButton = makeSpecializedButton({
  color: 'gray',
});

export const WarningButton = makeSpecializedButton({
  color: 'orange',
  icon: <WarningOutlined />,
});

export const ResetButton = makeSpecializedButton({
  color: 'red',
  icon: <CloseOutlined />,
  children: 'Zurücksetzen',
});

export const DeleteButton = makeSpecializedButton({
  color: 'red',
  icon: <DeleteOutlined />,
  children: 'Löschen',
});

export const SendButton = makeSpecializedButton({
  color: 'green',
  icon: <ExportOutlined />,
  children: 'Senden',
});
