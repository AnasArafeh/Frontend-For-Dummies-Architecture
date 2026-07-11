import { Paper, PaperProps } from '@mantine/core';
import type { ReactNode } from 'react';

export function BaseCard({ children, ...props }: PaperProps & { children?: ReactNode }) {
  return (
    <Paper
      shadow="sm"
      radius="md"
      p="md"
      withBorder
      {...props}
    >
      {children}
    </Paper>
  );
}
