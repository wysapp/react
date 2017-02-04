import React, {Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Events from '../utils/events';
import propTypes from '../utils/propTypes';
import Menu from '../Menu/Menu';
import Popover from '../Popover/Popover';
import warning from 'warning';

class IconMenu extends Component {
  static muiName = 'IconMenu';

  static propTypes = {
    anchorOrigin: propTypes.origin,
    animated: PropTypes.bool,
    animation: PropTypes.func,
    children: PropTypes.node,
    className: PropTypes.string,
    iconButtonElement: PropTypes.element.isRequired,
    iconStyle: PropTypes.object,
    listStyle: PropTypes.object,
    menuStyle: PropTypes.object,
    multiple: PropTypes.bool,

    onItemTouchTap: PropTypes.func,
    onKeyboardFocus: PropTypes.func,
    onMouseDown: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onMouseUp: PropTypes.func,
    onRequestChange: PropTypes.func,
    onTouchTap: PropTypes.func,

    open: PropTypes.bool,
    style: PropTypes.object,
    targetOrigin: propTypes.origin,
    touchTapCloseDelay: PropTypes.number,
    useLayerForClickAway: PropTypes.bool,
  };

  static defaultProps = {
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'left',
    },
    animated: true,
    multiple: false,
    open: null,
    onItemTouchTap: () => {},
    onKeyboardFocus: () => {},
    onMouseDown: () => {},
    onMouseLeave: () => {},
    onMouseEnter: () => {},
    onMouseUp: () => {},
    onRequestChange: () => {},
    onTouchTap: () => {},
    targetOrigin: {
      vertical: 'top',
      horizontal: 'left',
    },
    touchTapCloseDelay: 200,
    useLayerForClickAway: false,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  state = {
    menuInitiallyKeyboardFocused: false,
    open: false,
  };

  componentWillReceiveProps(nextProps) {
    console.log('11111111111111111111-componentWillReceiveProps', nextProps);
    if (nextProps.open !== null) {
      this.setState({
        open:nextProps.open,
        anchorEl: this.refs.iconMenuContainer,
      });
    }
  }

  open(reason, event) {
    if (this.props.open !== null) {
      this.props.onRequestChange(true, reason);

      return this.setState({
        menuInitiallyKeyboardFocused: Events.isKeyboard(event),
        anchorEl: event.currentTarget,
      });
    }

    this.setState({
      open: true,
      menuInitiallyKeyboardFocused: Events.isKeyboard(event),
      anchorEl: event.currentTarget,
    });

    event.preventDefault();
  }

  close(reason, isKeyboard) {
    if(!this.state.open) {
      return;
    }

    if (this.props.open !== null) {
      this.props.onRequestChange(false, reason);
    }
  }


  handleEscKeyDownMenu = (event) => {
    this.close('escape', event);
  }

  render() {
    const {
      anchorOrigin,
      className,
      animated,
      animation,
      iconButtonElement,
      iconStyle,
      onItemTouchTap,
      onKeyboardFocus,
      onMouseDown,
      onMouseLeave,
      onMouseEnter,
      onMouseUp,
      onRequestChange,
      onTouchTap,
      listStyle,
      menuStyle,
      style,
      targetOrigin,
      touchTapCloseDelay,
      useLayerForClickAway,
      ...other
    } = this.props;

    const {prepareStyles} = this.context.muiTheme;
    const {open, anchorEl} = this.state;

    const styles = {
      root: {
        display: 'inline-block',
        position: 'relative',
      },
      menu: {
        position: 'relative',
      },
    };

    const mergedRootStyles = Object.assign(styles.root, style);
    const mergedMenuStyles = Object.assign(styles.menu, menuStyle);

    warning(iconButtonElement.type.muiName !== 'SvgIcon',
      `Material-UI: You shoud not provide an <SvgIcon /> to the 'iconButtonElement' property of <IconMenu />.
You should wrapped it with an <IconButton />.`);


    const iconButtonProps = {
      onKeyboardFocus: onKeyboardFocus,
      onTouchTap: (event) => {
        this.open(Events.isKeyboard(event) ? 'keyboard' : 'iconTap', event);
        if (iconButtonElement.props.onTouchTap) {
          iconButtonElement.props.onTouchTap(event);
        }
      },
      ref: 'iconButton',
    };

    if (iconStyle || iconButtonElement.props.iconStyle) {
      iconButtonProps.iconStyle = iconStyle ? 
        Object.assign({}, iconStyle, iconButtonElement.props.iconStyle) :
        iconButtonElement.props.iconStyle;
    }

    const iconButton = React.cloneElement(iconButtonElement, iconButtonProps);

    const menu = (
      <Menu 
        {...other}
        initiallyKeyboardFocused={this.state.menuInitiallyKeyboardFocused}
        onEscKeyDown={this.handleEscKeyDownMenu}
        onItemTouchTap={this.handleItemTouchTap}
        style={mergedMenuStyles}
        listStyle={listStyle}
      >
        {this.props.children}
      </Menu>
    );

    return (
      <div 
        ref="iconMenuContainer"
        className={className}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseEnter={onMouseEnter}
        onMouseUp={onMouseUp}
        onTouchTap={onTouchTap}
        style={prepareStyles(mergedRootStyles)}
      >
        {iconButton}
        <Popover
          anchorOrigin={anchorOrigin}
          targetOrigin={targetOrigin}
          open={open}
          anchorEl={anchorEl}
          childContextTypes={this.constructor.childContextTypes}
          useLayerForClickAway={this.handleRequestClose}
          animated={animated}
          animation={animation}
          context={this.context}
        >
          {menu}
        </Popover>
      </div>
    );
  }
}

export default IconMenu;