import React, { Component, PropTypes } from 'react';


function getStyles(props, context) {
  const {primary, secondary} = props;
  const {badge} = context.muiTheme;

  let badgeBackgroundColor;
  let badgeTextColor;

  if (primary) {
    badgeBackgroundColor = badge.primaryColor;
    badgeTextColor = badge.primaryTextColor;
  } else if (secondary) {
    badgeBackgroundColor = badge.secondaryColor;
    badgeTextColor = badge.secondaryTextColor;
  } else {
    badgeBackgroundColor = badge.color;
    badgeTextColor = badge.textColor;
  }

  const radius = 12;

  const radius2x = Math.floor(2 * radius);

  return {
    root: {
      position: 'relative',
      display: 'inline-block',
      padding: `${radius2x}px ${radius2x}px ${radius}px ${radius}px`,
    },
    badge: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: 0,
      right: 0,
      fontWeight: badge.fontWeight,
      fontSize: radius,
      width: radius2x,
      height: radius2x,
      borderRadius: '50%',
      backgroundColor: badgeBackgroundColor,
      color: badgeTextColor,
    },
  };

}


class Badge extends Component {
  static propTypes = {
    badgeContent: PropTypes.node.isRequired,
    badgeStyle: PropTypes.object,
    children: PropTypes.node,
    className: PropTypes.string,
    primary: PropTypes.bool,
    secondary: PropTypes.bool,
    style: PropTypes.object,
  };

  static defaultProps = {
    primary: false,
    secondary: false,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  render() {

    const {
      badgeContent,
      badgeStyle,
      children,
      primary,
      secondary,
      style,
      ...other
    } = this.props;

    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context);

    return (
      <div {...other} style={prepareStyles(Object.assign({}, styles.root, style))}>
        {children}
        <span style={prepareStyles(Object.assign({}, styles.badge, badgeStyle))}>
          {badgeContent}
        </span>
      </div>
    );
  }
}

export default Badge;