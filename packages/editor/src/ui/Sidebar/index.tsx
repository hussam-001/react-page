import { AppBar, IconButton, Toolbar } from '@mui/material';
import { Box } from '@mui/system';
import { Menu } from '@mui/icons-material';
import React from 'react';
import { useOption, useUiTranslator } from '../../core/components/hooks';
import ToggleEdit from './ToggleEdit/index';
import ToggleInsert from './ToggleInsert/index';
import ToggleLayout from './ToggleLayout/index';
import TogglePreview from './TogglePreview/index';
import ToggleResize from './ToggleResize/index';
import UndoRedo from './UndoRedo';
import Zoom from './Zoom';

const getStickyNessstyle = (stickyness?: StickyNess): React.CSSProperties => {
  if (
    !stickyness ||
    (!stickyness.shouldStickToBottom && !stickyness.shouldStickToTop)
  ) {
    return {
      position: 'fixed',
      // right: stickyness?.rightOffsetFixed || 0,
    };
  }

  return {
    position: 'absolute',
    bottom: stickyness.shouldStickToBottom ? 0 : 'auto',
    top: stickyness.shouldStickToTop ? 0 : 'auto',
    // right: -stickyness.rightOffset || 0,
  };
};

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}

export type StickyNess = {
  shouldStickToTop: boolean;
  shouldStickToBottom: boolean;
  rightOffset: number;
  rightOffsetFixed: number;
  stickyElRef?: React.Ref<HTMLDivElement>;
};
export const Sidebar: React.FC<{
  stickyNess?: StickyNess;
  handleDrawerToggle?: () => void;
}> = ({ stickyNess, handleDrawerToggle }) => {
  const { t } = useUiTranslator();
  const zoomEnabled = useOption('zoomEnabled');
  const undoRedoEnabled = useOption('undoRedoEnabled');
  const editEnabled = useOption('editEnabled');
  const insertEnabled = useOption('insertEnabled');
  const layoutEnabled = useOption('layoutEnabled');
  const resizeEnabled = useOption('resizeEnabled');
  const previewEnabled = useOption('previewEnabled');
  const defaultLabels = {
    edit: 'Edit blocks',
    insert: 'Add blocks',
    layout: 'Move blocks',
    resize: 'Resize blocks',
    preview: 'Preview page',
  };

  const customOptions = useOption('customOptions');

  const actions = [
    // eslint-disable-next-line react/jsx-key
    undoRedoEnabled
      ? { action: <UndoRedo labelRedo="redo" labelUndo="undo" /> }
      : null,
    zoomEnabled
      ? { action: <Zoom labelZoomIn="zoom in" labelZoomOut="zoom out" /> }
      : null,
    editEnabled
      ? { action: <ToggleEdit label={t(defaultLabels.edit) ?? ''} /> }
      : null,
    insertEnabled
      ? { action: <ToggleInsert label={t(defaultLabels.insert) ?? ''} /> }
      : null,
    layoutEnabled
      ? { action: <ToggleLayout label={t(defaultLabels.layout) ?? ''} /> }
      : null,
    resizeEnabled
      ? { action: <ToggleResize label={t(defaultLabels.resize) ?? ''} /> }
      : null,
    previewEnabled
      ? { action: <TogglePreview label={t(defaultLabels.preview) ?? ''} /> }
      : null,
    ...(customOptions?.map((customOption) => ({ action: customOption })) ?? []),
  ].filter(notEmpty);
  return (
    <AppBar color="default" position="fixed" elevation={1}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <Menu />
        </IconButton>
        <Box ml="auto" display="flex">
          {actions.map(({ action }, index) => (
            <div key={index}>
              <>{action}</>
            </div>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
