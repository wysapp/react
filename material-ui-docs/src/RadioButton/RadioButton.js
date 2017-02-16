import React, {Component, PropTypes} from 'react';
import transitions from '../styles/transitions';
import EnhancedSwitch from '../internal/EnhancedSwitch';
import RadioButtonOff from '../svg-icons/toggle/radio-button-unchecked';
import RadioButtonOn from '../svg-icons/toggle/radio-button-checked';

function getStyles(props, context) {
  const {radioButton} = context.muiTheme;

  return {
    icon: {

    },
    target: {

    },
    fill: {

    },
    targetWhenChecked: {

    },
    fillWhenChecked: {

    },
    targetWhenDisabled: {

    },
    fillWhenDisabled: {

    },
    label: {

    },
    ripple: {

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