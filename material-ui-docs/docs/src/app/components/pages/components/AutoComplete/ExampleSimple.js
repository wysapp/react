import React, { Component } from 'react';
import AutoComplete from 'material-ui/AutoComplete';

export default class AutoCompleteExampleSimple extends Component {

  state = {
    dataSource: [],
  };


  render() {
    return (
      <div>
        <AutoComplete
          hintText="Type anything"
          dataSource={this.state.dataSource}
        />
      </div>
    )
  }
}