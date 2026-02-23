import React from 'react';

import { CodeOutlined, DataObjectOutlined, EditOutlined, PreviewOutlined } from '@mui/icons-material';
import { Tab, Tabs } from '@mui/material';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import { setSelectedMainTab, useSelectedMainTab } from '../../documents/editor/EditorContext';

export default function MainTabsGroup() {
  const selectedMainTab = useSelectedMainTab();
  const handleChange = (_: unknown, v: unknown) => {
    switch (v) {
      case 'json':
      case 'preview':
      case 'editor':
      case 'html':
        setSelectedMainTab(v);
        return;
      default:
        setSelectedMainTab('editor');
    }
  };

  return (
    <Tabs value={selectedMainTab} onChange={handleChange}>
      <Tab
        value="editor"
        label={
          <Tooltip>
            <TooltipTrigger asChild>
              <EditOutlined fontSize="small" />
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Edit</p>
            </TooltipContent>
          </Tooltip>
        }
      />
      <Tab
        value="preview"
        label={
          <Tooltip>
            <TooltipTrigger asChild>
              <PreviewOutlined fontSize="small" />
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Preview</p>
            </TooltipContent>
          </Tooltip>
        }
      />
      <Tab
        value="html"
        label={
          <Tooltip>
            <TooltipTrigger asChild>
              <CodeOutlined fontSize="small" />
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>HTML output</p>
            </TooltipContent>
          </Tooltip>
        }
      />
      <Tab
        value="json"
        label={
          <Tooltip>
            <TooltipTrigger asChild>
              <DataObjectOutlined fontSize="small" />
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>JSON output</p>
            </TooltipContent>
          </Tooltip>
        }
      />
    </Tabs>
  );
}
