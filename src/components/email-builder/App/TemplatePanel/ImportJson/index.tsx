import React, { useState } from 'react';

import { FileUploadOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import ImportJsonDialog from './ImportJsonDialog';

export default function ImportJson() {
  const [open, setOpen] = useState(false);

  let dialog = null;
  if (open) {
    dialog = <ImportJsonDialog onClose={() => setOpen(false)} />;
  }

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <IconButton onClick={() => setOpen(true)} color="inherit">
            <FileUploadOutlined fontSize="small" />
          </IconButton>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Import JSON</p>
        </TooltipContent>
      </Tooltip>
      {dialog}
    </>
  );
}
