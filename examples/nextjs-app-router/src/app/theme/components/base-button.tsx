'use client';

import { Button, ButtonProps } from '@mantine/core';
import type { ReactNode, MouseEventHandler } from 'react';

export function BaseButton({
  children,
  onClick,
  ...props
}: ButtonProps & { children?: ReactNode; onClick?: MouseEventHandler<HTMLButtonElement> }) {
  return <Button {...props} onClick={onClick}>{children}</Button>;
}
