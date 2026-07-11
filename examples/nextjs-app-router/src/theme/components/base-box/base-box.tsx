'use client';

import { Box, type BoxProps } from '@mantine/core';
import type { ReactNode, ComponentPropsWithoutRef, ElementType } from 'react';

// Allow any HTML element and its native props via the component prop.
// This makes BaseBox a universal wrapper that can render as any HTML element
// (div, a, button, form, input, etc.) with all native attributes.
type BaseBoxProps<C extends ElementType = 'div'> = BoxProps &
  ComponentPropsWithoutRef<C> & {
    children?: ReactNode;
    component?: C;
  };

export function BaseBox<C extends ElementType = 'div'>({ children, component, ...props }: BaseBoxProps<C>) {
  return (
    <Box
      component={component as any}
      {...props}
    >
      {children}
    </Box>
  );
}
