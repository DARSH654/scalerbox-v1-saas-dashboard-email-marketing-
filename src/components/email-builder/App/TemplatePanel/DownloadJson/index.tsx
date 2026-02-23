import React, { useMemo } from 'react';

import { FileDownloadOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import { useDocument } from '../../../documents/editor/EditorContext';

export default function DownloadJson() {
  const doc = useDocument();
  const href = useMemo(() => {
    return `data:text/plain,${encodeURIComponent(JSON.stringify(doc, null, '  '))}`;
  }, [doc]);
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <IconButton href={href} download="emailTemplate.json">
          <FileDownloadOutlined fontSize="small" />
        </IconButton>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <p>Download JSON file</p>
      </TooltipContent>
    </Tooltip>
  );
}
