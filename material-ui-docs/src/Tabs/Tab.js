import React, {Component, PropTypes } from 'react';
import EnhancedButton from '../internal/EnhancedButton';

function getStyles(props, context) {
  const {tabs} = context.muiTheme;

  return {
    root: {
      color: props.selected ? tabs.selectedTextColor : tabs.textColor,
      fontWeight: 500,
      fontSize: 14,
      width: props.width,
      textTransform: 'uppercase',
      padding: 0,
    },
    button: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: (props.label && props.icon) ? 72 : 48,
    },
  };
  
}


class Tab extends Component {
  static muiName = 'Tab';

  static propTypes = {
    buttonStyle: PropTypes.object,
    className: PropTypes.string,
    icon: PropTypes.node,
    index: PropTypes.any,
    label: PropTypes.node,
    onActive: PropTypes.func,
    onTouchTap: PropTypes.func,
    selected: PropTypes.bool,
    style: PropTypes.object,
    value: PropTypes.any,
    width: PropTypes.string,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };


  handleTouchTap = (event) => {
    if (this.props.onTouchTap) {
      this.props.onTouchTap(this.props.value, event, this);
    }
  }

  render() {

    const {
      icon,
      index,
      onActive,
      onTouchTap,
      selected,
      label,
      buttonStyle,
      style,
      value,
      width,
      ...other
    } = this.props;

    const styles = getStyles(this.props, this.context);

    let iconElement;
    if (icon && React.isValidElement(icon)) {
      const iconProps = {
        style: {
          fontSize: 24,
          color: styles.root.color,
          marginBottom: label ? 5 : 0,
        },
      };

      if ( icon.type.muiName !== 'FontIcon') {
        iconProps.color = styles.root.color;
      }

      iconElement = React.cloneElement(icon, iconProps);
    }

    const rippleOpacity = 0.3;
    const rippleColor = this.context.muiTheme.tabs.selectedTextColor;

    return (
      <EnhancedButton
        {...other}
        style={Object.assign(styles.root, style)}
        focusRippleColor={rippleColor}
        touchRippleColor={rippleColor}
        focusRippleOpacity={rippleOpacity}
        touchRippleOpacity={rippleOpacity}
        onTouchTap={this.handleTouchTap}
      >
        <div style={Object.assign(styles.button, buttonStyle)}>
          {iconElement}
          {label}
        </div>
      </EnhancedButton>
    );
  }
}

export default Tab;