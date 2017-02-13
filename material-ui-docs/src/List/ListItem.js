import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import shallowEqual from 'recompose/shallowEqual';
import {fade} from '../utils/colorManipulator';
import transitions from '../styles/transitions';
import EnhancedButton from '../internal/EnhancedButton';
import IconButton from '../IconButton';
import OpenIcon from '../svg-icons/navigation/expand-less';
import CloseIcon from '../svg-icons/navigation/expand-more';
import NestedList from './NestedList';


function getStyles(props, context, state) {
  const {
    insetChildren,
    leftAvatar,
    leftCheckbox,
    leftIcon,
    nestedLevel,
    rightAvatar,
    rightIcon,
    rightIconButton,
    rightToggle,
    secondaryText,
    secondaryTextLines,
  } = props;

  const {muiTheme} = context;
  const {listItem} = muiTheme;

  const textColor = muiTheme.baseTheme.palette.textColor;
  const hoverColor = props.hoverColor || fade(textColor, 0.1);
  const singleAvatar = !secondaryText && (leftAvatar || rightAvatar);
  const singleNoAvatar = !secondaryText && !(leftAvatar || rightAvatar);
  const twoLine = secondaryText && secondaryTextLines === 1;
  const threeLine = secondaryText && secondaryTextLines > 1;

  const styles = {
    root: {
      backgroundColor: (state.isKeyboardFocused || state.hovered) &&
      !state.rightIconButtonHovered &&
      !state.rightIconButtonKeyboardFocused ? hoverColor : null,
      color: textColor,
      display: 'block',
      fontSize: 16,
      lineHeight: '16px',
      position: 'relative',
      transition: transitions.easeOut(),
    },

    // This inner div is needed so that ripples will span the entire container
    innerDiv: {
      marginLeft: nestedLevel * listItem.nestedLevelDepth,
      paddingLeft: leftIcon || leftAvatar || leftCheckbox || insetChildren ? 72 : 16,
      paddingRight: rightIcon || rightAvatar || rightIconButton ? 56 : rightToggle ? 72 : 16,
      paddingBottom: singleAvatar ? 20 : 16,
      paddingTop: singleNoAvatar || threeLine ? 16 : 20,
      position: 'relative',
    },

    icons: {
      height: 24,
      width: 24,
      display: 'block',
      position: 'absolute',
      top: twoLine ? 12 : singleAvatar ? 4 : 0,
      margin: 12,
    },

    leftIcon: {
      left: 4,
    },

    rightIcon: {
      right: 4,
    },

    avatars: {
      position: 'absolute',
      top: singleAvatar ? 8 : 16,
    },

    label: {
      cursor: 'pointer',
    },

    leftAvatar: {
      left: 16,
    },

    rightAvatar: {
      right: 16,
    },

    leftCheckbox: {
      position: 'absolute',
      display: 'block',
      width: 24,
      top: twoLine ? 24 : singleAvatar ? 16 : 12,
      left: 16,
    },

    primaryText: {
    },

    rightIconButton: {
      position: 'absolute',
      display: 'block',
      top: twoLine ? 12 : singleAvatar ? 4 : 0,
      right: 4,
    },

    rightToggle: {
      position: 'absolute',
      display: 'block',
      width: 54,
      top: twoLine ? 25 : singleAvatar ? 17 : 13,
      right: 8,
    },

    secondaryText: {
      fontSize: 14,
      lineHeight: threeLine ? '18px' : '16px',
      height: threeLine ? 36 : 16,
      margin: 0,
      marginTop: 4,
      color: listItem.secondaryTextColor,

      // needed for 2 and 3 line ellipsis
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: threeLine ? null : 'nowrap',
      display: threeLine ? '-webkit-box' : null,
      WebkitLineClamp: threeLine ? 2 : null,
      WebkitBoxOrient: threeLine ? 'vertical' : null,
    },
  };

  return styles;
}

class ListItem extends Component {
  static muiName = 'ListItem';

  static propTypes = {
    autoGenerateNestedIndicator: PropTypes.bool,
    children: PropTypes.node,
    disableKeyboardFocus: PropTypes.bool,
    disabled: PropTypes.bool,
    hoverColor: PropTypes.string,
    initiallyOpen: PropTypes.bool,
    innerDivStyle: PropTypes.object,
    insetChildren: PropTypes.bool,
    leftAvatar: PropTypes.element,
    leftCheckbox: PropTypes.element,
    leftIcon: PropTypes.element,
    nestedItems: PropTypes.arrayOf(PropTypes.element),
    nestedLevel: PropTypes.number,
    nestedListStyle: PropTypes.object,

    onKeyboardFocus: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onNestedListToggle: PropTypes.func,
    onTouchEnd: PropTypes.func,
    onTouchStart: PropTypes.func,
    onTouchTap: PropTypes.func,

    open: PropTypes.bool,
    primaryText: PropTypes.node,
    primaryTogglesNestedList: PropTypes.bool,
    rightAvatar: PropTypes.element,
    rightIcon: PropTypes.element,
    rightIconButton: PropTypes.element,
    rightToggle: PropTypes.element,
    secondaryText: PropTypes.node,

    secondaryTextLines: PropTypes.oneOf([1, 2]),

    style: PropTypes.object,
  };

  static defaultProps = {
    autoGenerateNestedIndicator: true,
    disableKeyboardFocus: false,
    disabled: false,
    initiallyOpen: false,
    insetChildren: false,
    nestedItems: [],
    nestedLevel: 0,
    onKeyboardFocus: () => {},
    onMouseEnter: () => {},
    onMouseLeave: () => {},
    onNestedListToggle: () => {},
    onTouchEnd: () => {},
    onTouchStart: () => {},

    open: null,
    primaryTogglesNestedList: false,
    secondaryTextLines: 1,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  state = {
    hovered: false,
    isKeyboardFocused: false,
    open: false,
    rightIconButtonHovered: false,
    rightIconButtonKeyboardFocused: false,
    touch: false,
  };

  componentWillMount() {
    this.setState({
      open: this.props.open === null ? this.props.initiallyOpen === true : this.props.open,
    });
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.open !== null) {
      this.setState({open: nextProps.open});
    }

    if (nextProps.disabled && this.state.hovered) {
      this.setState({hovered: false});
    }
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return (
      !shallowEqual(this.props, nextProps) ||
      !shallowEqual(this.state, nextState) ||
      !shallowEqual(this.context, nextContext)
    );
  }


  applyFocusState(focusState) {
    const button = this.refs.enhancedButton;
    if (button) {
      const buttonEl = ReactDOM.findDOMNode(button);

      switch(focusState) {
        case 'none':
          buttonEl.blur();
          break;
        case 'focused':
          buttonEl.focus();
          break;
        case 'keyboard-focused':
          button.setKeyboardFocus();
          buttonEl.focus();
          break;
      }
    }
  }


  createDisabledElement(styles, contentChildren, additionalProps) {
    const {
      innerDivStyle,
      style,
    } = this.props;

    const mergedDivStyles = Object.assign({},
      styles.root,
      styles.innerDiv,
      innerDivStyle,
      style
    );

    return (
      <div 
        {...additionalProps}
        style={this.context.muiTheme.prepareStyles(mergedDivStyles)}
      >
        {contentChildren}
      </div>
    );
  }


  createTextElement(styles, data, key) {
    const {prepareStyles} = this.context.muiTheme;
    if (React.isValidElement(data)) {
      let style = Object.assign({}, styles, data.props.style);
      if (typeof data.type === 'string') {
        style = prepareStyles(style);
      }
      return React.cloneElement(data, {
        key: key,
        style: style
      });
    }

    return (
      <div key={key} style={prepareStyles(styles)}>
        {data}
      </div>
    );
  }

  handleKeyboardFocus = (event, isKeyboardFocused) => {
    this.setState({isKeyboardFocused: isKeyboardFocused});
    this.props.onKeyboardFocus(event, isKeyboardFocused);
  }

  handleMouseEnter = (event) => {

    if (!this.state.touch) this.setState({hovered: true});
    this.props.onMouseEnter(event);
  }

  handleMouseLeave = (event) => {
    this.setState({hovered: false});
    this.props.onMouseLeave(event);
  }

  handleNestedListToggle = (event) => {
    event.stopPropagation();
    if (this.props.open === null) {
      this.setState({open: !this.state.open}, () => {
        this.props.onNestedListToggle(this);
      });
    } else {
      this.props.onNestedListToggle({
        ...this,
        state: {
          open: !this.state.open,
        },
      });
    }
  }

  handleTouchStart = (event) => {
    this.setState({touch: true});
    this.props.onTouchStart(event);
  }

  pushElement(children, element, baseStyles, additionalProps) {
    if (element) {
      const styles = Object.assign({}, baseStyles, element.props.style);
      children.push(
        React.cloneElement(element, {
          key: children.length,
          style: styles,
          ...additionalProps,
        })
      );
    }
  }

  render() {
    const {
      autoGenerateNestedIndicator,
      children,
      disabled,
      disableKeyboardFocus,
      hoverColor,
      initiallyOpen,
      innerDivStyle,
      insetChildren,
      leftAvatar,
      leftCheckbox,
      leftIcon,
      nestedItems,
      nestedLevel,
      nestedListStyle,
      onKeyboardFocus,
      onMouseEnter,
      onMouseLeave,
      onNestedListToggle,
      onTouchStart,
      onTouchTap,
      rightAvatar,
      rightIcon,
      rightIconButton,
      rightToggle,
      primaryText,
      primaryTogglesNestedList,
      secondaryText,
      secondaryTextLines,
      style,
      ...other
    } = this.props;

    const { prepareStyles } = this.context.muiTheme;

    
    const styles = getStyles(this.props, this.context, this.state);

    const contentChildren = [children];

    if (leftIcon) {
      const additionalProps = {
        color: leftIcon.props.color || this.context.muiTheme.listItem.leftIconColor,
      };

      this.pushElement(
        contentChildren,
        leftIcon,
        Object.assign({}, styles.icons, styles.leftIcon),
        additionalProps
      );
    }

    if (rightIcon) {
      const additionalProps = {
        color: rightIcon.props.color || this.context.muiTheme.listItem.rightIconColor,
      };

      this.pushElement(
        contentChildren,
        rightIcon,
        Object.assign({}, styles.icons, styles.rightIcon),
        additionalProps
      );
    }

    if (leftAvatar) {
      this.pushElement(
        contentChildren,
        leftAvatar,
        Object.assign({}, styles.avatars, styles.leftAvatar)
      );
    }

    if (rightAvatar) {
      this.pushElement(
        contentChildren,
        rightAvatar,
        Object.assign({}, styles.avatars, styles.rightAvatar)
      )
    }

    const hasNestListItems = nestedItems.length;
    const hasRightElement = rightAvatar || rightIcon || rightIconButton || rightToggle;
    const needsNestedIndicator = hasNestListItems && autoGenerateNestedIndicator && !hasRightElement;

    if (rightIconButton || needsNestedIndicator) {
      let rightIconButtonElement = rightIconButton;
      const rightIconButtonHandlers = {
        onKeyboardFocus: this.handleRightIconButtonKeyboardFocus,
        onMouseEnter: this.handleRightIconButtonMouseEnter,
        onMouseLeave: this.handleRightIconButtonMouseLeave,
        onTouchTap: this.handleRightIconButtonTouchTap,
        onMouseDown: this.handleRightIconButtonMouseUp,
        onMouseUp: this.handleRightIconButtonMouseUp
      };

      if (needsNestedIndicator) {
        rightIconButtonElement = this.state.open ?
          <IconButton><OpenIcon /></IconButton> :
          <IconButton><CloseIcon /></IconButton>;
        rightIconButtonHandlers.onTouchTap = this.handleNestedListToggle;
      }

      this.pushElement(
        contentChildren,
        rightIconButtonElement,
        Object.assign({}, styles.rightIconButton),
        rightIconButtonHandlers
      );
    }

    if (primaryText) {
      const primaryTextElement = this.createTextElement(
        styles.primaryText,
        primaryText,
        'primaryText'
      );

      contentChildren.push(primaryTextElement);
    }

    if (secondaryText) {
      const secondaryTextElement = this.createTextElement(
        styles.secondaryText,
        secondaryText,
        'secondaryText'
      );

      contentChildren.push(secondaryTextElement);
    }

    const nestedList = nestedItems.length ? (
      <NestedList nestedLevel={nestedLevel} open={this.state.open} style={nestedListStyle}>
        {nestedItems}
      </NestedList>
    ) : undefined;


    const simpleLabel = !primaryTogglesNestedList && (leftCheckbox || rightToggle);

    return (
      <div>
        {
          simpleLabel ? this.createLabelElement(styles, contentChildren, other) :
            disabled ? this.createDisabledElement(styles, contentChildren, other) : (
              <EnhancedButton
                containerElement="span"
                {...other}
                disableKeyboardFocus={disableKeyboardFocus || this.state.rightIconButtonKeyboardFocused}
                onKeyboardFocus={this.handleKeyboardFocus}
                onMouseLeave={this.handleMouseLeave}
                onMouseEnter={this.handleMouseEnter}
                onTouchStart={this.handleTouchStart}
                onTouchEnd={this.handleTouchEnd}
                onTouchTap={primaryTogglesNestedList ? this.handleNestedListToggle : onTouchTap}
                ref="enhancedButton"
                style={Object.assign({}, styles.root, style)}
              >
                <div style={prepareStyles(Object.assign(styles.innerDiv, innerDivStyle))}>
                  {contentChildren}
                </div>
              </EnhancedButton>
            )
        }
        {nestedList}
      </div>
    );
  }
}

export default ListItem;