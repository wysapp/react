import React, {PropTypes} from 'react';
import CheckCircle from '../svg-icons/action/check-circle';
import SvgIcon from '../SvgIcon';

const getStyles = ({active, completed, disabled}, {muiTheme, stepper}) => {
  const {
    textColor,
    disabledTextColor,
    iconColor,
    inactiveIconColor,
  } = muiTheme.stepper;

  const {baseTheme} = muiTheme;
  const {orientation} = stepper;

  const styles = {
    root: {
      height: orientation === 'horizontal' ? 72 : 64,
      color: textColor,
      display: 'flex',
      alignItems: 'center',
      fontFamily: baseTheme.fontFamily,
      fontSize: 14,
      paddingLeft: 14,
      paddingRight: 14,
    },
    icon: {
      color: iconColor,
      display: 'block',
      fontSize: 24,
      width: 24,
      height: 24,
    },
    iconContainer: {
      paddingRight: 8,
    },
  };

  if (active) {
    styles.root.fontWeight= 500;
  }

  if (!completed && !active) {
    styles.icon.color = inactiveIconColor;
  }

  if (disabled) {
    styles.icon.color = inactiveIconColor;
    styles.root.color = disabledTextColor;
    styles.root.cursor = 'not-allowed';
  }

  return styles;
}

const renderIcon = (completed, icon, styles) => {
  const iconType = typeof icon;

  if (iconType === 'number' || iconType === 'string') {
    if (completed) {
      return (
        <CheckCircle
          color={styles.icon.color}
          style={styles.icon}
        />
      );
    }

    return (
      <SvgIcon color={styles.icon.color} style={styles.icon}>
        <circle cx="12" cy="12" r="10" />
        <text 
          x="12"
          y="16"
          textAnchor="middle"
          fontSize="12"
          fill="#fff"
        >
          {icon}
        </text>
      </SvgIcon>
    );
  }

  return icon;
}

const StepLabel = (props, context) => {
  const {
    active,
    children,
    completed,
    icon: userIcon,
    iconContainerStyle,
    last,
    style,
    ...other
  } = props;

  const {prepareStyles} = context.muiTheme;
  const styles = getStyles(props, context);
  const icon = renderIcon(completed, userIcon, styles);

  return (
    <span style={prepareStyles(Object.assign(styles.root, style))} {...other}>
      {icon && (
        <span style={prepareStyles(Object.assign(styles.iconContainer, iconContainerStyle))} >
          {icon}
        </span>
      )
      }
      {children}
    </span>
  );
};

StepLabel.muiName='StepLabel';
StepLabel.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node,
  completed: PropTypes.bool,
  disabled: PropTypes.bool,
  icon: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.number,
  ]),
  iconContainerStyle:PropTypes.object,
  last: PropTypes.bool,
  style: PropTypes.object,
};

StepLabel.contextTypes = {
  muiTheme: PropTypes.object.isRequired,
  stepper: PropTypes.object,
};

export default StepLabel;