import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import shallowEqual from 'recompose/shallowEqual';
import ClickAwayListener from '../internal/ClickAwayListener';
import keycode from 'keycode';
import propTypes from '../utils/propTypes';
import List from '../List/List';
import{HotKeyHolder} from './menuUtils';


function getStyles(props, context) {
  const {
    desktop,
    maxHeight,
    width, 
  } =  props;

  const { muiTheme } = context;

  const styles = {
    root: {
      zIndex: muiTheme.zIndex.menu,
      maxHeight: maxHeight,
      overflowY: maxHeight ? 'auto' : null,
    },
    divider: {
      marginTop: 7,
      marginBottom: 8,
    },
    list: {
      display: 'table-cell',
      paddingBottom: desktop ? 16 : 8,
      paddingTop: desktop ? 16 : 8,
      userSelect: 'none',
      width: width,
    },
    selectedMenuItem: {
      color: muiTheme.menuItem.selectedTextColor,
    },
  };

  return styles;
}

class Menu extends Component {
  static propTypes = {
    autoWidth:PropTypes.bool,
    children: PropTypes.node,
    desktop: PropTypes.bool,
    disableAutoFocus: PropTypes.bool,
    initiallyKeyboardFocused: PropTypes.bool,
    listStyle: PropTypes.object,
    maxHeight: PropTypes.number,
    menuItemStyle: PropTypes.object,
    multiple: PropTypes.bool,

    onChange: PropTypes.func,
    onEscKeyDown: PropTypes.func,
    onItemTouchTap: PropTypes.func,
    onKeyDown: PropTypes.func,
    onMenuItemFocusChange: PropTypes.func,
    
    selectedMenuItemStyle: PropTypes.object,

    style: PropTypes.object,
    value: PropTypes.any,
    valueLink: PropTypes.object,
    width: propTypes.stringOrNumber,
  };

  static defaultProps = {
    autoWidth: true,
    desktop: false,
    disableAutoFocus: false,
    initiallyKeyboardFocused: false,
    maxHeight: null,
    multiple: false,
    onChange: () => {},
    onEscKeyDown: () => {},
    onItemTouchTap: () =>{},
    onKeyDown: () => {},
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  constructor(props, context) {
    super(props, context);

    const filteredChildren = this.getFilteredChildren(props.children);
    const selectedIndex = this.getSelectedIndex(props, filteredChildren);

    const newFocusIndex = props.disableAutoFocus ? -1 : selectedIndex >= 0 ? selectedIndex : 0;

    if (newFocusIndex !== -1 && props.onMenuItemFocusChange) {
      props.onMenuItemFocusChange(null, newFocusIndex);
    }

    this.state = {
      focusIndex: newFocusIndex,
      isKeyboardFocused: props.initiallyKeyboardFocused,
      keyWidth: props.desktop ? 64 : 56,
    };

    this.hotKeyHolder = new HotKeyHolder();
  }

  componentDidMount() {
    if (this.props.autoWidth) {
      this.setWidth();
    } 
    this.setScrollPosition();
  }

  componentWillReceiveProps(nextProps) {
    const filteredChildren = this.getFilteredChildren(nextProps.children);
    const selectedIndex = this.getSelectedIndex(nextProps, filteredChildren);

    const newFocusIndex = nextProps.disableAutoFocus ? -1 : selectedIndex >= 0 ? selectedIndex : 0;

    if (newFocusIndex !== this.state.focusIndex && this.props.onMenuItemFocusChange) {
      this.props.onMenuItemFocusChange(null, newFocusIndex);
    }

    this.setState({
      focusIndex: newFocusIndex,
      keyWidth: nextProps.desktop ? 64 : 56,
    });
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return (
      !shallowEqual(this.props, nextProps) ||
      !shallowEqual(this.state, nextState) || 
      !shallowEqual(this.context, nextContext)
    );
  }

  componentDidUpdate() {
    if (this.props.autoWidth) this.setWidth();
  }

  handleClickAway = (event) => {
    if (event.defaultPrevented) {
      return;
    }

    this.setFocusIndex(event, -1, false);
  }

  getValueLink(props) {
    return props.valueLink || {
      value: props.value,
      requestChange: props.onChange,
    };
  }

  getFilteredChildren(children) {
    const filteredChildren = [];
    React.Children.forEach(children, (child) => {
      if (child) {
        filteredChildren.push(child);
      }
    });

    return filteredChildren;
  }


  cloneMenuItem(child, childIndex, styles, index) {
    const {
      desktop,
      menuItemStyle,
      selectedMenuItemStyle,
    } = this.props;

    const selected = this.isChildSelected(child, this.props);
    let selectedChildrenStyles = {};

    if (selected) {
      selectedChildrenStyles = Object.assign(styles.selectedMenuItem, selectedMenuItemStyle);
    }

    const mergedChildrenStyles = Object.assign({}, child.props.style, menuItemStyle, selectedChildrenStyles);

    const isFocused = childIndex === this.state.focusIndex;
    let focusState = 'none';
    if (isFocused) {
      focusState = this.state.isKeyboardFocused ? 'keyboard-focused' : 'focused';
    }

    return React.cloneElement(child, {
      desktop: desktop,
      focusState: focusState,
      onTouchTap: (event) => {
        this.handleMenuItemTouchTap(event, child, index);
        if (child.props.onTouchTap) child.props.onTouchTap(event);
      },
      ref: isFocused ? 'focusedMenuItem' : null,
      style: mergedChildrenStyles,
    });
  }

  decrementKeyboardFocusIndex(event) {
    let index = this.state.focusIndex;

    index--;
    if(index < 0) index = 0;
    
    this.setFocusIndex(event, index, true);
  }


  getMenuItemCount(filteredChildren) {
    let menuItemCount = 0;
    filteredChildren.forEach((child) => {
      const childIsAdivider = child.type && child.type.muiName === 'Divider';
      const childIsDisabled = child.props.disabled;
      if (!childIsAdivider && !childIsDisabled) menuItemCount++;
    });

    return menuItemCount;
  }

  getSelectedIndex(props, filteredChildren) {
    let selectedIndex = -1;
    let menuItemIndex = 0;

    filteredChildren.forEach((child) => {
      const childIsADivider = child.type && child.type.muiName === 'Divider';

      if (this.isChildSelected(child, props)) selectedIndex = menuItemIndex;
      if(!childIsADivider) menuItemIndex++;
    });

    return selectedIndex;
  }

  handleKeyDown = (event) => {
    const filteredChildren = this.getFilteredChildren(this.props.children);
    const key = keycode(event);
    console.log('2222222222222222222222222-handleKeyDown', key);
    switch(key) {
      case 'down':
        event.preventDefault();
        this.incrementKeyboardFocusIndex(event, filteredChildren);
        break;
      case 'esc':
        this.props.onEscKeyDown(event);
        break;
      case 'tab':
        event.preventDefault();
        if (event.shiftKey) {
          this.decrementKeyboardFocusIndex(event);
        } else {
          this.incrementKeyboardFocusIndex(event, filteredChildren);
        }
        break;
      case 'up':
        event.preventDefault();
        this.decrementKeyboardFocusIndex(event);
        break;
      default:
      
        if (key && key.length === 1) {
          const hotKeys = this.hotKeyHolder.append(key);
          
          if (this.setFocusIndexStartsWith(event, hotKeys)) {
            event.preventDefault();
          }
        }
    }

    this.props.onKeyDown(event);
  }

  setFocusIndexStartsWith(event, keys) {
    let foundIndex = -1;
    React.Children.forEach(this.props.children, (child, index) => {
      if (foundIndex >= 0) {
        return;
      }
      const {primaryText} = child.props;
      if (typeof primaryText === 'string' && new RegExp(`^${keys}`, 'i').test(primaryText)) {
        foundIndex = index;
      }
    });

    if (foundIndex >= 0) {
      this.setFocusIndex(event, foundIndex, true);
      return true;
    }
    return false;
  }

  handleMenuItemTouchTap(event, item, index) {
    const children = this.props.children;
    const multiple = this.props.multiple;
    const valueLink = this.getValueLink(this.props);
    const menuValue = valueLink.value;
    const itemValue = item.props.value;
    const focusIndex = React.isValidElement(children) ? 0 : children.indexOf(item);

    this.setFocusIndex(event, focusIndex, false);

    if (multiple) {
      const itemIndex = menuValue.indexOf(itemValue);
      const [...newMenuValue] = menuValue;
      if (itemIndex === -1) {
        newMenuValue.push(itemValue);
      } else {
        newMenuValue.splice(itemIndex, 1);
      }

      valueLink.requestChange(event, newMenuValue);
    } else if (!multiple && itemValue !== menuValue) {
      valueLink.requestChange(event, itemValue);
    }

    this.props.onItemTouchTap(event, item, index);
  }


  incrementKeyboardFocusIndex(event, filteredChildren) {
    let index = this.state.focusIndex;
    const maxIndex = this.getMenuItemCount(filteredChildren) - 1;
    index++;
    if (index > maxIndex) index = maxIndex;
    this.setFocusIndex(event, index, true);
  }

  isChildSelected(child, props){
    const menuValue = this.getValueLink(props).value;
    const childValue = child.props.value;

    if (props.multiple) {
      return menuValue.length && menuValue.indexOf(childValue) !== -1;

    } else {
      return child.props.hasOwnProperty('value') && menuValue === childValue;
    }
  }

  setFocusIndex(event, newIndex, isKeyboardFocused) {
    if (this.props.onMenuItemFocusChange) {
      this.props.onMenuItemFocusChange(event, newIndex);
    }

    this.setState({
      focusIndex: newIndex,
      isKeyboardFocused: isKeyboardFocused,
    });
  }

  setScrollPosition() {
    const desktop = this.props.desktop;
    const focusedMenuItem = this.refs.focusedMenuItem;
    const menuItemHeight = desktop ? 32 : 48;

    if (focusedMenuItem) {
      const selectedOffset = ReactDOM.findDOMNode(focusedMenuItem).offsetTop;

      let scrollTop = selectedOffset - menuItemHeight;
      if (scrollTop < menuItemHeight) scrollTop = 0;

      ReactDOM.findDOMNode(this.refs.scrollContainer).scrollTop = scrollTop;
    }
  }

  cancelScrollEvent(event) {
    event.stopPropagation();
    event.preventDefault();
    return false;
  }

  handleOnWheel = (event) => {
    const scrollContainer = this.refs.scrollContainer;
    
    if (scrollContainer.scrollHeight <= scrollContainer.clientHeight) return;

    const {scrollTop, scrollHeight, clientHeight} = scrollContainer;
    const wheelDelta = event.deltaY;
    const isDeltaPosition = wheelDelta > 0;

    if (isDeltaPosition && wheelDelta > scrollHeight - clientHeight - scrollTop) {
      scrollContainer.scrollTop = scrollHeight;
      return this.cancelScrollEvent(event);
    } else if(!isDeltaPosition && -wheelDelta > scrollTop) {
      scrollContainer.scrollTop = 0;
      return this.cancelScrollEvent(event);
    }
  }

  setWidth() {
    const el = ReactDOM.findDOMNode(this);
    const listEl = ReactDOM.findDOMNode(this.refs.list);
    const elWidth = el.offsetWidth;
    const keyWidth = this.state.keyWidth;
    const minWidth = keyWidth * 1.5;
    let keyIncrements = elWidth / keyWidth;
    let newWidth;

    keyIncrements = keyIncrements <= 1.5 ? 1.5 : Math.ceil(keyIncrements);
    newWidth = keyIncrements * keyWidth;

    if (newWidth < minWidth ) newWidth = minWidth;

    el.style.width = `${newWidth}px`;
    listEl.style.width = `${newWidth}px`;
  }

  render() {
    const {
      autoWidth,
      children,
      desktop,
      disableAutoFocus,
      initiallyKeyboardFocused,
      listStyle,
      maxHeight,
      multiple,
      onItemTouchTap,
      onEscKeyDown,
      onMenuItemFocusChange,
      selectedMenuItemStyle,
      menuItemStyle,
      style,
      value,
      valueLink,
      width,
      ...other
    } = this.props;

    const { prepareStyles } = this.context.muiTheme;
    const styles = getStyles(this.props, this.context);

    const mergedRootStyles = Object.assign(styles.root, style);
    const mergedListStyles = Object.assign(styles.list, listStyle);

    const filteredChildren = this.getFilteredChildren(children);

    let menuItemIndex = 0;
    const newChildren = React.Children.map(filteredChildren, (child, index) => {
      const childIsDisabled = child.props.disabled;
      const childName = child.type ? child.type.muiName : '';
      let newChild = child;

      switch(childName) {
        case 'MenuItem':
          newChild = childIsDisabled ? React.cloneElement(child, {desktop: desktop}) : 
            this.cloneMenuItem(child, menuItemIndex, styles, index);
          break;
        
        case 'Divider':
          newChild = React.cloneElement(child, {
            style: Object.assign({}, styles.divider, child.props.style),
          });
          break;        
      }

      if (childName === 'MenuItem' && !childIsDisabled) {
        menuItemIndex++;
      }

      return newChild;
    });

    return (
      <ClickAwayListener onClickAway={this.handleClickAway}>
        <div 
          onKeyDown={this.handleKeyDown}
          onWheel={this.handleOnWheel}
          style={prepareStyles(mergedRootStyles)}
          ref="scrollContainer"
        >
          <List 
            {...other}
            ref="list"
            style={mergedListStyles}
          >
            {newChildren}
          </List>
        </div>
      </ClickAwayListener>
    );

  }
}

export default Menu;