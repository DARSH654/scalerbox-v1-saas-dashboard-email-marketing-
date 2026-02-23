import React from 'react';

import { Box, Stack, Typography, IconButton, Dialog, DialogTitle, DialogActions, Button } from '@mui/material';
import { DeleteOutlined } from '@mui/icons-material';

import { TEditorBlock, TEditorConfiguration } from '../../../../../documents/editor/core';
import { resetDocument, setSelectedBlockId, useDocument, useSelectedBlockId, useSelectedMainTab, useSelectedSidebarTab } from '../../../../../documents/editor/EditorContext';
import { ColumnsContainerProps } from '../../../../../documents/blocks/ColumnsContainer/ColumnsContainerPropsSchema';

const filterChildrenIds = (childrenIds: string[] | null | undefined, blockId: string) => {
  if (!childrenIds) {
    return childrenIds;
  }
  return childrenIds.filter((f) => f !== blockId);
};

const deleteBlock = (document: TEditorConfiguration, blockId: string) => {
  const nDocument: typeof document = { ...document };
  for (const [id, b] of Object.entries(nDocument)) {
    const block = b as TEditorBlock;
    if (id === blockId) {
      continue;
    }

    switch (block.type) {
      case 'EmailLayout':
        nDocument[id] = {
          ...block,
          data: {
            ...block.data,
            childrenIds: filterChildrenIds(block.data.childrenIds, blockId),
          },
        };
        break;
      case 'Container':
        nDocument[id] = {
          ...block,
          data: {
            ...block.data,
            props: {
              ...block.data.props,
              childrenIds: filterChildrenIds(block.data.props?.childrenIds, blockId),
            },
          },
        };
        break;
      case 'ColumnsContainer':
        nDocument[id] = {
          type: 'ColumnsContainer',
          data: {
            style: block.data.style,
            props: {
              ...block.data.props,
              columns: block.data.props?.columns?.map((c) => ({
                childrenIds: filterChildrenIds(c.childrenIds, blockId),
              })),
            },
          } as ColumnsContainerProps,
        };
        break;
      default:
        nDocument[id] = block;
    }
  }
  delete nDocument[blockId];
  return nDocument;
}

type SidebarPanelProps = {
  title: string;
  children: React.ReactNode;
};
export default function BaseSidebarPanel({ title, children }: SidebarPanelProps) {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const selectedBlockId = useSelectedBlockId();
  const selectedSidebarTab = useSelectedSidebarTab();
  const selectedMainTab = useSelectedMainTab();
  const document = useDocument();

  const handleDelete = () => {
    if (!selectedBlockId) return;
    const newDoc = deleteBlock(document, selectedBlockId);
    resetDocument(newDoc);
    setIsDialogOpen(false);
    setSelectedBlockId(null);
  }

  return (
    <Box p={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="overline" color="text.secondary" sx={{ display: 'block' }}>
          {title}
        </Typography>
        {selectedSidebarTab === 'block-configuration' && selectedMainTab === 'editor' && (
          <IconButton size="small" onClick={() => setIsDialogOpen(true)} color="error">
            <DeleteOutlined fontSize="small" />
          </IconButton>
        )}
      </Box>
      <Stack spacing={5} mb={3}>
        {children}
      </Stack>

      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>Do you really want to delete this block?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
