import React from 'react';
import { Box } from '@mui/material';
import { TooltipProvider } from '@/components/ui/tooltip';

import InspectorDrawer from './InspectorDrawer';
import SamplesDrawer from './SamplesDrawer';
import TemplatePanel from './TemplatePanel';

export default function App() {
  return (
    <TooltipProvider>
      <Box sx={{ display: 'flex', width: '100%', height: '100%', overflow: 'hidden' }}>
        <SamplesDrawer />

        <Box sx={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column', position: 'relative' }}>
          <TemplatePanel />
        </Box>

        <InspectorDrawer />
      </Box>
    </TooltipProvider>
  );
}
