import React from 'react';

import { MonitorOutlined, PhoneIphoneOutlined } from '@mui/icons-material';
import { Box, Stack, SxProps, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Reader } from '@usewaypoint/email-builder';

import EditorBlock from '../../documents/editor/EditorBlock';
import {
  setSelectedScreenSize,
  useDocument,
  useSelectedMainTab,
  useSelectedScreenSize,
} from '../../documents/editor/EditorContext';
import ToggleInspectorPanelButton from '../InspectorDrawer/ToggleInspectorPanelButton';
import ToggleSamplesPanelButton from '../SamplesDrawer/ToggleSamplesPanelButton';

import DownloadJson from './DownloadJson';
import HtmlPanel from './HtmlPanel';
import ImportJson from './ImportJson';
import JsonPanel from './JsonPanel';
import MainTabsGroup from './MainTabsGroup';
import FullscreenButton from './FullscreenButton';

export default function TemplatePanel() {
  const document = useDocument();
  const selectedMainTab = useSelectedMainTab();
  const selectedScreenSize = useSelectedScreenSize();

  // Sanitize document to prevent empty src warnings in preview mode
  const sanitizedDocument = React.useMemo(() => {
    if (!document) return document;
    const sanitized = { ...document };
    for (const key of Object.keys(sanitized)) {
      const block = sanitized[key];
      if (block?.type === 'Image' && block?.data?.props) {
        if (!block.data.props.url) {
          sanitized[key] = {
            ...block,
            data: {
              ...block.data,
              props: {
                ...block.data.props,
                url: 'https://placehold.co/600x400@2x/F8F8F8/CCC?text=Your%20image',
              },
            },
          };
        }
      }
    }
    return sanitized;
  }, [document]);

  let mainBoxSx: SxProps = {
    minHeight: '100%',
  };
  if (selectedScreenSize === 'mobile') {
    mainBoxSx = {
      ...mainBoxSx,
      margin: '32px auto',
      width: 370,
      height: 800,
      boxShadow:
        'rgba(33, 36, 67, 0.04) 0px 10px 20px, rgba(33, 36, 67, 0.04) 0px 2px 6px, rgba(33, 36, 67, 0.04) 0px 0px 1px',
    };
  }

  const handleScreenSizeChange = (_: unknown, value: unknown) => {
    switch (value) {
      case 'mobile':
      case 'desktop':
        setSelectedScreenSize(value);
        return;
      default:
        setSelectedScreenSize('desktop');
    }
  };

  const renderMainPanel = () => {
    switch (selectedMainTab) {
      case 'editor':
        return (
          <Box sx={mainBoxSx}>
            <EditorBlock id="root" />
          </Box>
        );
      case 'preview':
        return (
          <Box sx={mainBoxSx}>
            <Reader document={sanitizedDocument} rootBlockId="root" />
          </Box>
        );
      case 'html':
        return <HtmlPanel />;
      case 'json':
        return <JsonPanel />;
    }
  };

  return (
    <>
      <Stack
        sx={{
          height: 49,
          borderBottom: 1,
          borderColor: 'divider',
          backgroundColor: 'white',
          position: 'sticky',
          top: 0,
          zIndex: 'appBar',
          px: 1,
        }}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <ToggleSamplesPanelButton />
        <Stack px={2} direction="row" gap={2} width="100%" justifyContent="space-between" alignItems="center">
          <Stack direction="row" spacing={2}>
            <MainTabsGroup />
          </Stack>
          <Stack direction="row" spacing={2}>
            <DownloadJson />
            <ImportJson />
            <ToggleButtonGroup value={selectedScreenSize} exclusive size="small" onChange={handleScreenSizeChange}>
              <ToggleButton value="desktop">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <MonitorOutlined fontSize="small" />
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>Desktop view</p>
                  </TooltipContent>
                </Tooltip>
              </ToggleButton>
              <ToggleButton value="mobile">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <PhoneIphoneOutlined fontSize="small" />
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>Mobile view</p>
                  </TooltipContent>
                </Tooltip>
              </ToggleButton>
            </ToggleButtonGroup>
            <FullscreenButton />
          </Stack>
        </Stack>
        <ToggleInspectorPanelButton />
      </Stack>
      <Box sx={{ height: 'calc(100% - 49px)', overflow: 'auto', minWidth: 370 }}>{renderMainPanel()}</Box>
    </>
  );
}
