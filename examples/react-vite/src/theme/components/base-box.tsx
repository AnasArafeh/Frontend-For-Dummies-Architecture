import { Box, BoxProps } from '@mantine/core';

// Theme wrapper — even a direct wrapper enforces single-source control.
// Swap the library here and every component in the app updates.

export function BaseBox(props: BoxProps) {
  return <Box {...props} />;
}
