import React, {Component, PropTypes } from 'react';
import transitions from '../styles/transitions';
import Paper from '../Paper';
import EnhancedSwitch from '../internal/EnhancedSwitch';

function getStyles(props, context, state) {
  const {
    disabled,
    elementStyle,
    trackSwitchedStyle,
    thumbSwitchedStyle,
    trackStyle,
    thumbStyle,
    iconStyle,
    rippleStyle,
    labelStyle,
  } = props;

  const {
    baseTheme,
    toggle,
  } = context.muiTheme;

  const toggleSize = 20;
  const toggleTrackWidth = 36;

  const styles = {
    icon: {
      width: 36,
      padding: '4px 0px 6px 2px',
    },
    ripple: {
      top: -10,
      left: -10,
      color: state.switched ? toggle.thumbOnColor : baseTheme.palette.textColor,
    },
    toggleElement: {
      width: toggleTrackWidth,
    },
    track: {
      transition: transitions.easeOut(),
      width: '100%',
      height: 14,
      borderRadius: 30,
      backgroundColor: toggle.trackOffColor,
    },
    thumb: {
      transition: transitions.easeOut(),
      position: 'absolute',
      top: 1,
      left: 0,
      width: toggleSize,
      height: toggleSize,
      lineHeight: '24px',
      borderRadius: '50%',
      backgroundColor: toggle.thumbOffColor,
    },
    trackWhenSwitched: {
      backgroundColor: toggle.trackOnColor,
    },
    thumbWhenSwitched: {
      backgroundColor: toggle.thumbOnColor,
      left: '100%',
    },
    trackWhenDisabled: {
      backgroundColor: toggle.trackDisabledColor,
    },
    thumbWhenDisabled: {
      backgroundColor: toggle.thumbDisabledColor,
    },
    label: {
      color: disabled ? toggle.labelDisabledColor : toggle.labelColor,
      width: `calc(100% - ${(toggleTrackWidth + 10)}px)`,
    },
  };

  Object.assign(styles.track,
    trackStyle,
    state.switched && styles.trackWhenSwitched,
    state.switched && trackSwitchedStyle,
    disabled && styles.trackWhenDisabled
  );

  Object.assign(styles.thumb,
    thumbStyle,
    state.switched && styles.thumbWhenSwitched,
    state.switched && thumbSwitchedStyle,
    disabled && styles.thumbWhenDisabled
  );

  if(state.switched) {
    styles.thumb.marginLeft = 0 - styles.thumb.width;
  }

  Object.assign(styles.icon, iconStyle);
  Object.assign(styles.ripple, rippleStyle);
  Object.assign(styles.label, labelStyle);
  Object.assign(styles.toggleElement, elementStyle);

  return styles;

}


class Toggle extends Component {
  static propTypes = {
    defaultToggled: PropTypes.bool,
    disabled: PropTypes.bool,
    elementStyle: PropTypes.object,
    iconStyle: PropTypes.object,
    inputStyle: PropTypes.object,
    label: PropTypes.node,
    labelPosition: PropTypes.oneOf(['left', 'right']),
    labelStyle: PropTypes.object,

    onToggle: PropTypes.func,

    rippleStyle: PropTypes.object,
    style: PropTypes.object,
    thumbStyle: PropTypes.object,
    thumbSwitchedStyle:PropTypes.object,
    toggled: PropTypes.bool,
    trackStyle: PropTypes.object,
    trackSwitchedStyle: PropTypes.object,

    valueLink: PropTypes.object,
  };

  static defaultProps = {
    defaultToggled: false,
    disabled: false,
    labelPosition: 'left',
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  state = {
    switched: false,
  };

  componentWillMount() {
    const {toggled, defaultToggled, valueLink} = this.props;

    if (toggled || defaultToggled || (valueLink && valueLink.value)) {
      this.setState({
        switched: true,
      });
    }
  }

  handleStateChange = (newSwitched) => {
    this.setState({
      switched: newSwitched,
    });
  }

  handleToggle = (event, isInputChecked) => {
    if (this.props.onToggle) {
      this.props.onToggle(event, isInputChecked);
    }
  }

  render(){

    const {
      defaultToggled,
      elementStyle,
      onToggle,
      trackSwitchedStyle,
      thumbSwitchedStyle,
      toggled,
      ...other
    } = this.props;

    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context, this.state);

    const toggleElement = (
      <div style={prepareStyles(Object.assign({}, styles.toggleElement))}>
        <div style={prepareStyles(Object.assign({}, styles.track))} />
        <Paper style={styles.thumb} circle={true} zDepth={1} />
      </div>
    );

    const enhancedSwitchProps = {
      ref: 'enhancedSwitch',
      inputType: 'checkbox',
      switchElement: toggleElement,
      rippleStyle: styles.ripple,
      rippleColor: styles.ripple.color,
      iconStyle: styles.icon,
      trackStyle: styles.track,
      thumbStyle: styles.thumb,
      labelStyle: styles.label,
      switched: this.state.switched,
      onSwitch: this.handleToggle,
      onParentShouldUpdate: this.handleStateChange,
      labelPosition: this.props.labelPosition,
    };

    if (this.props.hasOwnProperty('toggled')) {
      enhancedSwitchProps.checked = toggled;
    } else if (this.props.hasOwnProperty('defaultToggled')) {
      enhancedSwitchProps.defaultChecked = defaultToggled;
    }

    return (
      <EnhancedSwitch 
        {...other}
        {...enhancedSwitchProps}
      />
    );
  }
}

export default Toggle;