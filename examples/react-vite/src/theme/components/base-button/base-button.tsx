import { Button, type ButtonProps } from '@mantine/core';
import type { ReactNode, MouseEventHandler } from 'react';

export function BaseButton({
  children,
  onClick,
  type,
  ...props
}: ButtonProps & { children?: ReactNode; onClick?: MouseEventHandler<HTMLButtonElement>; type?: 'button' | 'submit' | 'reset' }) {
  return (
    <Button
      {...props}
      type={type}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
