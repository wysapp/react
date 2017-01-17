import React, { Component, cloneElement, PropTypes} from 'react';

import Paper from '../Paper';

function validateLabel(props, propName, componentName) {
  if (process.env.NODE_ENV !== 'production') {
    if (!props.children && (props.label !== 0 && !props.label) && !props.icon) {
      return new Error(`Required prop label or children or icon was not specified in ${componentName}.`);
    }
  }
}

class RaisedButton extends Component {
  static muiName = 'RaisedButton';

  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    disabled: PropTypes.bool,

    fullWidth: PropTypes.bool,

    label: validateLabel,

    labelColor: PropTypes.string,

    labelPosition: PropTypes.oneOf([
      'before',
      'after'
    ]),

    primary: PropTypes.bool,
    secondary: PropTypes.bool,
  };

  static defaultProps = {
    disabled: false,
    labelPosition: 'after',
    fullWidth: false,
    primary: false,
    secondary: false,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  state = {
    hovered: false,
    keyboardFocused: false,
    touched: false,
    initialZDepth: 0,
    zDepth: 0,
  };

  componentWillMount() {
    const zDepth = this.props.disabled ? 0 : 1;
    this.setState({
      zDepth: zDepth,
      initialZDepth: zDepth,
    });
  }

  render() {
    console.log('uuuuuuuuuuuuuuuuuuuu', this.context.muiTheme);
    
    return (
      <Paper>
        <div>iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii</div>
      </Paper>
    );
  }

}

export default RaisedButton;