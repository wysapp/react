/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule DraftEditorProps
 * @flow
 */

'use strict';

import type ContentBlock from 'ContentBlock';

export type DraftEditorProps = {
  editorState: EditorState,
  onChange: (editorState: EditorState) => void,
  placeholder?: string,
  textAlignment?: DraftTextAlignment,
  blockRendererFn?: (block: ContentBlock) => ?Object,
  blockStyleFn?: (type: number) => string,
  keyBindingFn: (e: SyntheticKeyboardEvent) => ?string,
  readOnly?: boolean,
  spellCheck?: boolean,
  stripPastedStyles?: boolean,
  tabIndex?: number,

  ariaActiveDescendantID?: string,
  ariaAutoComplete?: string,
  ariaDescribedBy?: string,
  ariaExpanded?: boolean,
  ariaHasPopup?: boolean,
  ariaLabel?: string,
  ariaOwneeID?: string,

  webDriverTestID?: string,

  handleReturn?: (e: SyntheticKeyboardEvent) => DraftHandleValue,

  handleKeyCommand?: (command: DraftEditorCommand | string) => DraftHandleValue,

  handleBeforeInput?: (chars: string) => DraftHandleValue,
  handlePastedText?: (text: string, html?: string) => DraftHandleValue,
  handlePastedFiles?: (files: Array<Blob>) => DraftHandleValue,

  handleDroppedFiles?: (
    selection: SelectionState,
    files: Array<Blob>
  ) => DraftHandleValue,

  handleDrop?: (
    selection: SelectionState,
    dataTransfer: Object,
    isInternal: DraftDragType
  ) => DraftHandleValue,

  onEscape?: (e: SyntheticKeyboardEvent) => void,
  onTab?: (e: SyntheticKeyboardEvent) => void,
  onUpArrow?: (e: SyntheticKeyboardEvent) => void,
  onDownArrow?: (e: SyntheticKeyboardEvent) => void,

  onBlur?: (e: SyntheticEvent) => void,
  onFocus?: (e: SyntheticEvent) => void,

  customStyleMap?: Object,
  customStyleFn?: (style: DraftInlineStyle, block: ContentBlock) => ?Object,

  blockRenderMap: DraftBlockRenderMap
};

export type DraftEditorDefaultProps = {
  blockRenderMap: DraftBlockRenderMap,
  blockRendererFn: (block: ContentBlock) => ?Object,
  blockStyleFn: (type: number) => string,
  keyBindingFn: (e: SyntheticKeyboardEvent) => ?string,
  readOnly: boolean,
  spellCheck: boolean,
  stripPastedStyles: boolean,
};