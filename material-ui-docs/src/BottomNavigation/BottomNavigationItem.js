import React, {PropTypes, cloneElement} from 'react';
import EnhancedButton from '../internal/EnhancedButton';

function getStyles(props, context) {
  const {selected} = props;

  const {
    muiTheme: {
      bottomNavigation,
    },
  } = context;

  const color = selected ?
    bottomNavigation.selectedColor :
    bottomNavigation.unselectedColor;
  
  const styles = {
    root: {
      transition: 'padding-top 0.3s',
      paddingTop: selected ? 6 : 8,
      paddingBottom: 10,
      paddingLeft: 12,
      paddingRight: 12,
      minWidth: 80,
      maxWidth: 168,
    },
    label: {
      fontSize: selected ? 
        bottomNavigation.selectedFontSize :
        bottomNavigation.unselectedFontSize,
      transition: 'color 0.35s, font-size 0.35s',
      color: color,
    },
    icon: {
      display: 'block',
      width: '100%',
    },
    iconColor: color,
  };

  return styles;
}

const BottomNavigationItem = (props, context) => {
  const {
    label,
    icon,
    style,
    ...other
  } = props;

  const {prepareStyles} = context.muiTheme;
  const styles = getStyles(props, context);

  const styledIcon = cloneElement(icon, {
    style: Object.assign({}, styles.icon, icon.props.style),
    color: icon.props.color || styles.iconColor,
  });

  return (
    <EnhancedButton {...other} style={Object.assign({}, styles.root, style)}>
      {styledIcon}
      <div style={prepareStyles(styles.label)}>
        {label}
      </div>
    </EnhancedButton>
  );
};

BottomNavigationItem.propTypes = {
  icon: PropTypes.node,
  label: PropTypes.node,
  style: PropTypes.object,
};

BottomNavigationItem.contextTypes = {
  muiTheme: PropTypes.object.isRequired,
};

export default BottomNavigationItem;