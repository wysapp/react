import React, {Component, PropTypes} from 'react';
import transitions from '../styles/transitions';
import EnhancedSwitch from '../internal/EnhancedSwitch';
import RadioButtonOff from '../svg-icons/toggle/radio-button-unchecked';
import RadioButtonOn from '../svg-icons/toggle/radio-button-checked';

function getStyles(props, context) {
  const {radioButton} = context.muiTheme;

  return {
    icon: {
      height: radioButton.size,
      width: radioButton.size,
    },
    target: {
      transition: transitions.easeOut(),
      position: 'absolute',
      opacity: 1,
      transform: 'scale(1)',
      fill: radioButton.borderColor,
    },
    fill: {
      position: 'absolute',
      opacity: 1,
      transform: 'scale(0)',
      transformOrigin: '50% 50%',
      transition: transitions.easeOut(),
      fill: radioButton.checkedColor,
    },
    targetWhenChecked: {
      opacity: 0,
      transform: 'scale(0)',
    },
    fillWhenChecked: {
      opacity: 1,
      transform: 'scale(1)',
    },
    targetWhenDisabled: {
      fill: radioButton.disabledColor,
    },
    fillWhenDisabled: {
      fill: radioButton.disabledColor,
    },
    label: {
      color: props.disabled ? radioButton.labelDisabledColor : radioButton.labelColor,
    },
    ripple: {
      color: props.checked ? radioButton.checkedColor : radioButton.borderColor,
    },
  };
}


class RadioButton extends Component {
  static propTypes = {
    checked: PropTypes.bool,
    checkedIcon: PropTypes.element,
    disabled: PropTypes.bool,
    iconStyle: PropTypes.object,
    inputStyle: PropTypes.object,
    labelPosition: PropTypes.oneOf(['left', 'right']),
    labelStyle:PropTypes.object,

    onCheck: PropTypes.func,
    style:PropTypes.object,
    uncheckedIcon: PropTypes.element,
    value: PropTypes.any,
  };

  static defaultProps = {
    checked: false,
    disabled: false,
    labelPosition: 'right',
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  handleSwitch = (event) => {
    
    if (this.props.onCheck) {
      this.props.onCheck(event, this.props.value);
    }
  }

  render() {
    const {
      checkedIcon,
      checked,
      iconStyle,
      labelStyle,
      labelPosition,
      onCheck,
      uncheckedIcon,
      disabled,
      ...other
    } = this.props;

    const styles = getStyles(this.props, this.context);

    const uncheckedStyles = Object.assign(
      styles.target,
      checked && styles.targetWhenChecked,
      iconStyle,
      disabled && styles.targetWhenDisabled
    );

    const checkedStyles = Object.assign(
      styles.fill,
      checked && styles.fillWhenChecked,
      iconStyle,
      disabled && styles.fillWhenDisabled
    );

    const uncheckedElement = React.isValidElement(uncheckedIcon) ?
      React.cloneElement(uncheckedIcon, {
        style: Object.assign(uncheckedStyles, uncheckedIcon.props.style),
      }) :
      <RadioButtonOff style={uncheckedStyles} />;
    
    const checkedElement = React.isValidElement(checkedIcon) ?
      React.cloneElement(checkedIcon, {
        style: Object.assign(checkedStyles, checkedIcon.props.style),
      }) :
      <RadioButtonOn style={checkedStyles} />;

    const mergedIconStyle = Object.assign(styles.icon, iconStyle);
    const mergedLabelStyle = Object.assign(styles.label, labelStyle);

    return (
      <EnhancedSwitch 
        {...other}
        ref="enhancedSwitch"
        inputType="radio"
        checked={checked}
        switched={checked}
        disabled={disabled}
        rippleColor={styles.ripple.color}
        iconStyle={mergedIconStyle}
        labelStyle={mergedLabelStyle}
        labelPosition={labelPosition}
        onSwitch={this.handleSwitch}
        switchElement={<div>{uncheckedElement}{checkedElement}</div>}
      />
    );
    
  }
}

export default RadioButton;