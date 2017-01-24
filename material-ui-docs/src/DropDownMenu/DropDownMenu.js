import React, { Component, PropTypes } from 'react';
import transitions from '../styles/transitions';

import ClearFix from '../internal/ClearFix';


class DropDownMenu extends Component {
  static muiName = 'DropDownMenu';

  static propTypes = {
    animated: PropTypes.bool,
    animation: PropTypes.func,
    autoWidth: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    iconStyle: PropTypes.object,
    labelStyle: PropTypes.object,
    listStyle: PropTypes.object,
    maxHeight: PropTypes.number,
    menuItemStyle: PropTypes.object,
    menuStyle: PropTypes.object,
    onChange: PropTypes.func,
    onClose: PropTypes.func,
    openImmediately: PropTypes.bool,
    selectedMenuItemStyle: PropTypes.object,
    style: PropTypes.object,
    underlineStyle: PropTypes.object,
    value: PropTypes.any, 
  };

  static defaultProps = {
    animated: true,
    autoWidth: true,
    disabled: false,
    openImmediately: false,
    maxHeight: 500,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  state = {
    open: false,
  };

  render() {
    const {
      animated,
      animation,
      autoWidth,
      children,
      className,
      iconStyle,
      labelStyle,
      listStyle,
      maxHeight,
      menuStyle: menuStyleProp,
      onClose,
      openImmediately,
      menuItemStyle,
      selectedMenuItemStyle,
      style,
      underlineStyle,
      value,
      ...other
    } = this.props;

    const {
      anchorEl,
      open,
    } = this.state;

    const { prepareStyles } = this.context.muiTheme;
    const styles = getStyles(this.props, this.context);

    let displayValue = '';
    React.Children.forEach(children, (child) => {
      if ( child && value === child.props.value) {
        displayValue = child.props.label || child.props.primaryText;
      }
    });

    return <div>{children}</div>;
  }
}

export default DropDownMenu;