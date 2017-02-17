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


const React = require('React');
const ReactDOM = require('ReactDOM');

type State = {
  containerKey: number,
}

class DraftEditor extends React.Component {
  state: State;

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