import React, { Component, PropTypes } from 'react';
import EnhancedSwitch from '../internal/EnhancedSwitch';
import transitions from '../styles/transitions';
import CheckboxOutline from '../svg-icons/toggle/check-box-outline-blank';
import CheckboxChecked from '../svg-icons/toggle/check-box';

function getStyles(props, context) {
  const { checkbox } = context.muiTheme;
  const checkboxSize = 24;

  return {
    icon: {
      height: checkboxSize,
      width: checkboxSize,
    },
    check: {
      position: 'absolute',
      opacity: 0,
      transform: 'scale(0)',
      transitionOrigin: '50% 50%',
      transition: `${transitions.easeOut('450ms', 'opacity', '0ms')}, ${transitions.easeOut('0ms', 'transform', '450ms')}`,
      fill: checkbox.checkedColor,
    },
    checkWhenSwitched: {
      opacity: 1,
      transform: 'scale(1)',
      transition: `${transitions.easeOut('0ms', 'opacity', '0ms')}, ${transitions.easeOut('800ms', 'transform', '0ms')}`,
    },
    checkWhenDisabled: {
      fill: checkbox.disabledColor,
    },
    box: {
      position: 'absolute',
      opacity: 1,
      fill: checkbox.boxColor,
      transition: transitions.easeOut('1000ms', 'opacity', '200ms'),
    },
    boxWhenSwitched: {
      opacity: 0,
      transition: transitions.easeOut('650ms', 'opacity', '150ms'),
      fill: checkbox.checkedColor,
    },
    boxWhenDisabled: {
      fill: props.checked ? 'transparent' : checkbox.disabledColor,
    },
    label: {
      color: props.disabled ? checkbox.labelDisabledColor : checkbox.labelColor,
    },
  };

}


class Checkbox extends Component {
  static propTypes = {
    checked: PropTypes.bool,
    checkedIcon: PropTypes.element,
    defaultChecked: PropTypes.bool,
    disabled: PropTypes.bool,
    iconStyle: PropTypes.object,
    inputStyle: PropTypes.object,
    labelPosition: PropTypes.oneOf(['left', 'right']),
    labelStyle: PropTypes.object,
    onCheck: PropTypes.func,

    style: PropTypes.object,
    uncheckedIcon: PropTypes.element,
    valueLink: PropTypes.object,
  };

  static defaultProps = {
    labelPosition: 'right',
    disabled: false,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  state = {
    switched: false
  };


  componentWillMount() {
    const {checked, defaultChecked, valueLink} = this.props;

    if (checked || defaultChecked || (valueLink && valueLink.value)) {
      this.setState({
        switched: true,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.checked !== nextProps.checked) {
      this.setState({
        switched: nextProps.checked,
      });
    }
  }

  handleStateChange = (newSwitched) => {
    this.setState({
      switched: newSwitched,
    });
  }

  handleCheck = (event, isInputChecked) => {
    if (this.props.onCheck) {
      this.props.onCheck(event, isInputChecked);
    }
  }

  render() {
    const {
      iconStyle,
      onCheck,
      checkedIcon,
      uncheckedIcon,
      ...other
    } = this.props;

    const styles = getStyles(this.props, this.context);
    const boxStyles = Object.assign(
      styles.box,
      this.state.switched && styles.boxWhenSwitched,
      iconStyle,
      this.props.disabled && styles.boxWhenDisabled
    );

    const checkStyles = Object.assign(
      styles.check,
      this.state.switched && styles.checkWhenSwitched,
      iconStyle,
      this.props.disabled && styles.checkWhenDisabled
    );

    const checkedElement = checkedIcon ? React.cloneElement(checkedIcon, {
      style: Object.assign(checkStyles, checkedIcon.props.style)
    }) : React.createElement(CheckboxChecked, {
      style: checkStyles,
    });

    const unCheckedElement = uncheckedIcon ? React.cloneElement(uncheckedIcon, {
      style: Object.assign(boxStyles, uncheckedIcon.props.style)
    }) : React.createElement(CheckboxOutline, {
      style: boxStyles,
    });

    const checkboxElement = (
      <div>
        {unCheckedElement}
        {checkedElement}
      </div>
    );

    const rippleColor = this.state.switched ? checkStyles.fill : boxStyles.fill;
    const mergedIconStyle = Object.assign(styles.icon, iconStyle);

    const labelStyle = Object.assign(
      styles.label,
      this.props.labelStyle
    );

    const enhancedSwitchProps = {
      ref: 'enhancedSwitch',
      inputType: 'checkbox',
      switched: this.state.switched,
      switchElement: checkboxElement,
      rippleColor: rippleColor,
      iconStyle: mergedIconStyle,
      onSwitch: this.handleCheck,
      labelStyle: labelStyle,
      onParentShouldUpdate: this.handleStateChange,
      labelPosition: this.props.labelPosition,
    };

    return (
      <EnhancedSwitch {...other} {...enhancedSwitchProps} />
    );
  }
}


export default Checkbox;
