/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule DraftEditorCompositionHandler
 * @flow
 */

'use strict';


import type DraftEditor from 'DraftEditor.react';

const RESOLVE_DELAY = 20;

let resolved = false;
let stillComposing = false;
let textInputData = '';

var DraftEditorCompositionHandler = {

}

module.exports = DraftEditorCompositionHandler;