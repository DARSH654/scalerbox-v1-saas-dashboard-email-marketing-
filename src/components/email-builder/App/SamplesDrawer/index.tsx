import React from 'react';

import { Box, Stack, Typography } from '@mui/material';

import { useSamplesDrawerOpen } from '../../documents/editor/EditorContext';

import SidebarButton from './SidebarButton';

export const SAMPLES_DRAWER_WIDTH = 240;

export default function SamplesDrawer() {
  const samplesDrawerOpen = useSamplesDrawerOpen();

  return (
    <Box
      sx={{
        width: samplesDrawerOpen ? SAMPLES_DRAWER_WIDTH : 0,
        height: '100%',
        transition: 'width 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
        overflow: 'hidden',
        borderRight: 1,
        borderColor: 'divider',
        backgroundColor: 'background.paper',
        flexShrink: 0,
      }}
    >
      <Stack spacing={3} py={1} px={2} width={SAMPLES_DRAWER_WIDTH} justifyContent="space-between" height="100%">
        <Stack spacing={2} sx={{ '& .MuiButtonBase-root': { width: '100%', justifyContent: 'flex-start' } }}>
          <Typography variant="h6" component="h1" sx={{ p: 0.75 }}>
            Email Templates
          </Typography>

          <Stack alignItems="flex-start">
            <SidebarButton href="#">Empty</SidebarButton>
            <SidebarButton href="#sample/welcome">Welcome email</SidebarButton>
            <SidebarButton href="#sample/one-time-password">One-time passcode (OTP)</SidebarButton>
            <SidebarButton href="#sample/reset-password">Reset password</SidebarButton>
            <SidebarButton href="#sample/subscription-receipt">Subscription receipt</SidebarButton>
            <SidebarButton href="#sample/trial-start">Trial start</SidebarButton>
            <SidebarButton href="#sample/trial-ending-soon">Trial ending soon</SidebarButton>
            <SidebarButton href="#sample/trial-expired">Trial expired</SidebarButton>
            <SidebarButton href="#sample/onboarding-checklist">Onboarding checklist</SidebarButton>
            <SidebarButton href="#sample/feature-not-used">Feature not used</SidebarButton>
            <SidebarButton href="#sample/payment-failed">Payment failed</SidebarButton>
            <SidebarButton href="#sample/post-metrics-report">Post metrics</SidebarButton>
            <SidebarButton href="#sample/respond-to-message">Respond to inquiry</SidebarButton>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}
