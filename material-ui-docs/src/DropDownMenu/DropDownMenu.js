import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import transitions from '../styles/transitions';
import DropDownArrow from '../svg-icons/navigation/arrow-drop-down';
import Menu from '../Menu/Menu';
import ClearFix from '../internal/ClearFix';
import Popover from '../Popover/Popover';
import PopoverAnimationVertical from '../Popover/PopoverAnimationVertical';
import keycode from 'keycode';
import Events from '../utils/events';
import IconButton from '../IconButton';

const anchorOrigin = {
  vertical: 'top',
  horizontal: 'left',
};

function getStyles(props, context) {
  const {disabled} = props;
  const spacing = context.muiTheme.baseTheme.spacing;
  const palette = context.muiTheme.baseTheme.palette;
  const accentColor = context.muiTheme.dropDownMenu.accentColor;
  return {
    control: {
      cursor: disabled ? 'not-allowed' : 'pointer',
      height: '100%',
      position: 'relative',
      width: '100%',
    },
    icon: {
      fill: accentColor,
      position: 'absolute',
      right: spacing.desktopGutterLess,
      top: ((spacing.desktopToolbarHeight - 24) / 2),
    },
    iconChildren: {
      fill: 'inherit',
    },
    label: {
      color: disabled ? palette.disabledColor : palette.textColor,
      lineHeight: `${spacing.desktopToolbarHeight}px`,
      overflow: 'hidden',
      opacity: 1,
      position: 'relative',
      paddingLeft: spacing.desktopGutter,
      paddingRight: spacing.iconSize +
      spacing.desktopGutterLess +
      spacing.desktopGutterMini,
      textOverflow: 'ellipsis',
      top: 0,
      whiteSpace: 'nowrap',
    },
    labelWhenOpen: {
      opacity: 0,
      top: (spacing.desktopToolbarHeight / 8),
    },
    root: {
      display: 'inline-block',
      fontSize: spacing.desktopDropDownMenuFontSize,
      height: spacing.desktopSubheaderHeight,
      fontFamily: context.muiTheme.baseTheme.fontFamily,
      outline: 'none',
      position: 'relative',
      transition: transitions.easeOut(),
    },
    rootWhenOpen: {
      opacity: 1,
    },
    underline: {
      borderTop: `solid 1px ${accentColor}`,
      bottom: 1,
      left: 0,
      margin: `-1px ${spacing.desktopGutter}px`,
      right: 0,
      position: 'absolute',
    },
  };
}

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

  componentDidMount() {
    if (this.props.autoWidth) {
      this.setWidth();
    }
    if (this.props.openImmediately) {
      // TODO: Temporary fix to make openImmediately work with popover.
      /* eslint-disable react/no-did-mount-set-state */
      setTimeout(() => this.setState({
        open: true,
        anchorEl: this.rootNode,
      }), 0);
      /* eslint-enable react/no-did-mount-set-state */
    }
  }

  componentWillReceiveProps() {
    if (this.props.autoWidth) {
      this.setWidth();
    }
  }

  rootNode = undefined;
  arrowNode = undefined;

  setWidth() {
    const el = this.rootNode;
    if (!this.props.style || !this.props.style.hasOwnProperty('width')) {
      el.style.width = 'auto';
    }
  }

  handleTouchTapControl = (event) => {
    
    event.preventDefault();
    if (!this.props.disabled) {
      this.setState({
        open: !this.state.open,
        anchorEl: this.rootNode,
      });
    }
  };


  handleRequestCloseMenu = () => {
    this.close(false);
  }

  handleEscKeyDownMenu = () => {
    this.close(true);
  }

  handleKeyDown = (event) => {
    switch(keycode(event)) {
      case 'up':
      case 'down':
      case 'space':
      case 'enter':
        event.preventDefault();
        this.setState({
          open: true,
          anchorEl: this.rootNode,
        });
        break;
    }
  }

  handleItemTouchTap = (event, child, index) => {
    event.persist();
    this.setState({
      open: false,
    }, () => {
      if (this.props.onChange) {
        this.props.onChange(event, index, child.props.value);
      }

      this.close(Events.isKeyboard(event));
    });
  };

  close = (isKeyboard) => {
    this.setState({
      open: false,
    }, () => {
      if (this.props.onClose) {
        this.props.onClose();
      }

      if (isKeyboard) {
        const dropArrow = this.arrowNode;
        const dropNode = ReactDOM.findDOMNode(dropArrow);
        dropNode.focus();
        dropArrow.setKeyboardFocus(true);
      }
    })
  }

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

    let menuStyle;
    if (anchorEl && !autoWidth) {
      menuStyle = Object.assign({
        width: anchorEl.clientWidth,
      }, menuStyleProp);
    } else {
      menuStyle = menuStyleProp;
    }

    return (
      <div 
        {...other}
        ref={(node) => {
          this.rootNode = node;
        }}
        className={className}
        style={prepareStyles(Object.assign({}, styles.root, open && styles.rootWhenOpen, style))}
      >
        <ClearFix style={styles.control} onTouchTap={this.handleTouchTapControl}>
          <div 
            style={prepareStyles(Object.assign({}, styles.label, open && styles.labelWhenOpen, labelStyle))}>
            {displayValue}
          </div>
          
          <IconButton 
            tabIndex={this.props.disabled ? -1 : undefined}
            onKeyDown={this.handleKeyDown}
            ref={(node) => {
              this.arrowNode = node;
            }}
            style={Object.assign({}, styles.icon, iconStyle)}
            iconStyle={styles.iconChildren}
          >
            <DropDownArrow />
          </IconButton>
          <div style={prepareStyles(Object.assign({}, styles.underline, underlineStyle))} />
        </ClearFix>
        <Popover 
          anchorOrigin={anchorOrigin}
          anchorEl={anchorEl}
          animation={animation || PopoverAnimationVertical}
          open={open}
          animated={animated}
          onRequestClose={this.handleRequestCloseMenu}
        >
          <Menu 
            maxHeight={maxHeight}
            desktop={true}
            value={value}
            onEscKeyDown={this.handleEscKeyDownMenu}
            style={menuStyle}
            listStyle={listStyle}
            onItemTouchTap={this.handleItemTouchTap}
            menuItemStyle={menuItemStyle}
            selectedMenuItemStyle={selectedMenuItemStyle}
          >
            {children}
          </Menu>
        </Popover>
      </div>
    );
  }
}

export default DropDownMenu;