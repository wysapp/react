import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import shallowEqual from 'recompose/shallowEqual';
import Popover from '../Popover/Popover';
import CheckIcon from '../svg-icons/navigation/check';
import ListItem from '../List/ListItem';
import Menu from '../Menu/Menu';

const nestedMenuStyle = {
  position: 'relative',
};

function getStyles(props, context) {
  const disabledColor = context.muiTheme.baseTheme.palette.disabledColor;
  const textColor = context.muiTheme.baseTheme.palette.textColor;
  const indent = props.desktop ? 64 : 72;
  const sidePadding = props.desktop ? 24 : 16;

  const styles = {
    root: {
      color: props.disabled ? disabledColor : textColor,
      cursor: props.disabled ? 'not-allowed' : 'pointer',
      minHeight: props.desktop ? '32px' : '48px',
      lineHeight: props.desktop ? '32px' : '48px',
      fontSize: props.desktop ? 15 : 16,
      whiteSpace: 'nowrap',
    },
    innerDivStyle: {
      paddingLeft: props.leftIcon || props.insetChildren || props.checked ? indent : sidePadding,
      paddingRight: props.rightIcon ? indent : sidePadding,
      paddingBottom: 0,
      paddingTop: 0,
    },

    secondaryText: {
      float: 'right',
    },

    leftIconDesktop: {
      margin: 0,
      left: 24,
      top: 4,
    },

    rightIconDesktop: {
      margin: 0,
      right: 24,
      top: 4,
      fill: context.muiTheme.menuItem.rightIconDesktopFill,
    },
  };

  return styles;

}

class MenuItem extends Component {
  static muiName = 'MenuItem';

  static propTypes = {
    animation: PropTypes.func,
    checked: PropTypes.bool,
    children: PropTypes.node,
    desktop: PropTypes.bool,
    disabled: PropTypes.bool,
    focusState: PropTypes.oneOf([
      'none',
      'focused',
      'keyboard-focused',
    ]),

    innerDivStyle: PropTypes.object,
    insetChildren: PropTypes.bool,
    leftIcon: PropTypes.element,
    menuItems: PropTypes.node,
    onTouchTap: PropTypes.func,
    primaryText: PropTypes.node,
    rightIcon: PropTypes.element,
    secondaryText: PropTypes.node,
    style: PropTypes.object,
    value: PropTypes.any,
  };

  static defaultProps = {
    checked: false,
    desktop: false,
    disabled: false,
    focusState: 'none',
    insetChildren: false,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  state = {
    open: false,
  };

  componentDidMount() {
    this.applyFocusState();
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.open && nextProps.focusState === 'none') {
      this.handleRequestClose();
    }
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return (
      !shallowEqual(this.props, nextProps) ||
      !shallowEqual(this.state, nextState) ||
      !shallowEqual(this.context, nextContext)
    );
  }

  componentDidUpdate() {
    this.applyFocusState();
  }

  componentWillUnmount() {
    if (this.state.open) {
      this.setState({
        open: false,
      });
    }
  }

  applyFocusState() {
    
    this.refs.listItem.applyFocusState(this.props.focusState);
  }

  cloneMenuItem = (item) => {
    return React.cloneElement(item, {
      onTouchTap: (event) => {
        if(!item.props.menuItems) {
          this.handleRequestClose();
        }

        if (item.props.onTouchTap) {
          this.props.onTouchTap(event);
        }
      }
    })
  }

  handleTouchTap = (event) => {
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: ReactDOM.findDOMNode(this),
    });

    if (this.props.onTouchTap) {
      this.props.onTouchTap(event);
    }
  }

  handleRequestClose = () => {
    this.setState({
      open: false,
      anchorEl: null,
    });
  }

  render() {
    const {
      checked,
      children,
      desktop,
      disabled,
      focusState,
      innerDivStyle,
      insetChildren,
      leftIcon,
      menuItems,
      rightIcon,
      secondaryText,
      style,
      animation,
      value,
      ...other
    } = this.props;

    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context);
    const mergedRootStyles = Object.assign(styles.root, style);
    const mergedInnerDivStyles = Object.assign(styles.innerDivStyle, innerDivStyle);

    let leftIconElement = leftIcon ? leftIcon : checked ? <CheckIcon /> : null;
    if (leftIconElement) {
      const mergedLeftIconStyles = desktop ?
        Object.assign(styles.leftIconDesktop, leftIconElement.props.style) :
        leftIconElement.props.style;
      leftIconElement = React.cloneElement(leftIconElement, {style: mergedLeftIconStyles});
    }

    let rightIconElement;
    if (rightIcon) {
      const mergedRightIconStyles = desktop ?
        Object.assign(styles.rightIconDesktop, rightIcon.props.style) :
        rightIcon.props.style;
      rightIconElement = React.cloneElement(rightIcon, {style: mergedRightIconStyles});
    }

    let secondaryTextElement;
    if (secondaryText) {
      const secondaryTextIsAnElement = React.isValidElement(secondaryText);
      const mergedSecondaryTextStyles = secondaryTextIsAnElement ?
        Object.assign(styles.secondaryText, secondaryText.props.style) : null;
      
      secondaryTextElement = secondaryTextIsAnElement ?
        React.cloneElement(secondaryText, {style: mergedSecondaryTextStyles}) :
        <div style={prepareStyles(styles.secondaryText)}>{secondaryText}</div>;
    }

    let childMenuPopover;
    if (menuItems) {
      childMenuPopover = (
        <Popover 
          animation={animation}
          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          useLayerForClickAway={false}
          onRequestClose={this.handleRequestClose}
        >
          <Menu desktop={desktop} disabled={disabled} style={nestedMenuStyle}>
            {React.Children.map(menuItems, this.cloneMenuItem)}
          </Menu>
        </Popover>
      );
      other.onTouchTap= this.handleTouchTap;
    }
    
    return (
      <ListItem 
        {...other}
        disabled={disabled}
        hoverColor={this.context.muiTheme.menuItem.hoverColor}
        innerDivStyle={mergedInnerDivStyles}
        insetChildren={insetChildren}
        leftIcon={leftIconElement}
        ref="listItem"
        rightIcon={rightIconElement}
        style={mergedRootStyles}
      >
        {children}
        {secondaryTextElement}
        {childMenuPopover}
      </ListItem>
    );
  }
}

export default MenuItem;