'use client';

import { Box, BoxProps } from '@mantine/core';
import type { ReactNode } from 'react';

export function BaseBox({ children, ...props }: BoxProps & { children?: ReactNode; component?: any }) {
  return <Box {...props}>{children}</Box>;
}
