/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule DraftEditor.react
 * @typechecks
 * @flow
 * @preventMunge
 */

'use strict';


const DraftEditorCompositionHandler = require('DraftEditorCompositionHandler');
const DraftEditorDragHandler = require('DraftEditorDragHandler');
const DraftEditorEditHandler = require('DraftEditorEditHandler');

const React = require('React');
const ReactDOM = require('ReactDOM');
const Scroll = require('Scroll');
const Style = require('Style');
const UserAgent = require('UserAgent');

const cx = require('cx');

import type {DraftEditorProps, DraftEditorDefaultProps} from 'DraftEditorProps';

const isIE = UserAgent.isBrowser('IE');

const allowSpellCheck = !isIE;

const handleMap = {
  'edit': DraftEditorEditHandler,
  'composite': DraftEditorCompositionHandler,
  'drag': DraftEditorDragHandler,
  'cut': null,
  'render': null,
};

type State = {
  containerKey: number,
}



class DraftEditor extends React.Component {
  props: DraftEditorProps;
  state: State;

  static defaultProps: DraftEditorDefaultProps = {
    blockRenderMap: DefaultDraftBlockRenderMap,
    blockRendererFn: emptyFunction.thatReturnsNull,
    blockStyleFn: emptyFunction.thatReturns(''),
    keyBindingFn: getDefaultKeyBinding,
    readOnly: false,
    spellCheck: false,
    stripPastedStyles: false,
  };

  _blockSelectEvents: boolean;
  _clipboard: ?BlockMap;
  _handler: ?Object;
  _dragCount: number;
  _internalDrag: boolean;
  _editorKey: string;
  _placeholderAccessibilityID: string;
  _latestEditorState: EditorState;
  _pendingStateFromBeforeInput: void | EditorState;

  _onBeforeInput: Function;
  _onBlur: Function;
  _onCharacterData: Function;
  _onCompositionEnd: Function;
  _onCompositionStart: Function;
  _onCopy: Function;
  _onCut: Function;
  _onDragEnd: Function;
  _onDragOver: Function;
  _onDragStart: Function;
  _onDrop: Function;
  _onInput: Function;
  _onFocus: Function;
  _onKeyDown: Function;
  _onKeyPress: Function;
  _onKeyUp: Function;
  _onMouseDown: Function;
  _onMouseUp: Function;
  _onPaste: Function;
  _onSelect: Function;

  focus: () => void;
  blur: () => void;
  setMode: (mode: DraftEditorModes) => void;
  exitCurrentMode: () => void;
  restoreEditorDOM: (scrollPosition?: DraftScrollPosition) => void;
  setClipboard: (clipboard: ?BlockMap) => void;
  getClipboard: () => ?BlockMap;
  getEditorKey: () => string;
  update: (editorState: EditorState) => void;
  onDragEnter: () => void;
  onDragLeave: () => void;


  constructor(props) {
    super(props);

    this._blockSelectEvents = false;
    this._clipboard = null;
    this._handler = null;
    this._dragCount = 0;
    this._editorKey = generateRandomKey();
    this._placeholderAccessibilityID = 'placeholder-' + this._editorKey;
    this._latestEditorState = props.editorState;

    this._onBeforeInput = this._buildHandler('onBeforeInput');
    this._onBlur = this._buildHandler('onBlur');
    this._onCharacterData = this._buildHandler('onCharacterData');
    this._onCompositionEnd = this._buildHandler('onCompositionEnd');
    this._onCompositionStart = this._buildHandler('onCompositionStart');
    this._onCopy = this._buildHandler('onCopy');
    this._onCut = this._buildHandler('onCut');
    this._onDragEnd = this._buildHandler('onDragEnd');
    this._onDragOver = this._buildHandler('onDragOver');
    this._onDragStart = this._buildHandler('onDragStart');
    this._onDrop = this._buildHandler('onDrop');
    this._onInput = this._buildHandler('onInput');
    this._onFocus = this._buildHandler('onFocus');
    this._onKeyDown = this._buildHandler('onKeyDown');
    this._onKeyPress = this._buildHandler('onKeyPress');
    this._onKeyUp = this._buildHandler('onKeyUp');
    this._onMouseDown = this._buildHandler('onMouseDown');
    this._onMouseUp = this._buildHandler('onMouseUp');
    this._onPaste = this._buildHandler('onPaste');
    this._onSelect = this._buildHandler('onSelect');

    this.focus = this._onFocus.bind(this);
    this.blur = this._onBlur.bind(this);
    this.setMode = this._setMode.bind(this);
    this.exitCurrentMode = this._exitCurrentMode.bind(this);
    this.restoreEditorDOM = this._restoreEditorDOM.bind(this);
    this.setClipboard = this._setClipboard.bind(this);
    this.getClipboard = this._getClipboard.bind(this);
    this.getEditorKey = () => this._editorKey;
    this.update = this._update.bind(this);
    this.onDragEnter = this._onDragEnter.bind(this);
    this.onDragLeave = this._onDragLeave.bind(this);


    this.state = {
      containerKey: 0
    };
  }


  _buildHandler(eventName: string): Function {
    return (e) => {
      if (!this.props.readOnly) {
        const method = this._handler && this._handler[eventName];
        method && method(this, e);
      }
    };
  }

  render(): React.Element<any> {
    const {readOnly, textAlignment} = this.props;

    return (
      <div>
        DraftEditor
      </div>
    );
  }
}


module.exports = DraftEditor;