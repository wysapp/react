import React, {Component, PropTypes, cloneElement } from 'react';
import IconButton from '../IconButton';
import NavigationMenu from '../svg-icons/navigation/menu';
import Paper from '../Paper';
import propTypes from '../utils/propTypes';
import warning from 'warning';



export function getStyles(props, context) {
  const {
    appBar,
    button: {
      iconButtonSize,
    },
    zIndex,
  } = context.muiTheme;

  const flatButtonSize = 36;

  const styles = {
    root: {
      position: 'relative',
      zIndex: zIndex.appBar,
      width: '100%',
      display: 'flex',
      backgroundColor: appBar.color,
      paddingLeft: appBar.padding,
      paddingRight: appBar.padding,
    },
    title: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      margin: 0,
      paddingTop: 0,
      letterSpacing: 0,
      fontSize: 24,
      fontWeight: appBar.titleFontWeight,
      color: appBar.textColor,
      height: appBar.height,
      lineHeight: `${appBar.height}px`,
    },
    mainElement: {
      boxFlex: 1,
      flex: '1',
    },
    iconButtonStyle: {
      marginTop: (appBar.height - iconButtonSize) / 2,
      marginRight: 8,
      marginLeft: -16,
    },
    iconButtonIconStyle: {
      fill: appBar.textColor,
      color: appBar.textColor,
    },
    flatButton: {
      color: appBar.textColor,
      marginTop: (iconButtonSize - flatButtonSize) / 2 + 1,
    },
  };

  return styles;
}

class AppBar extends Component {
  static muiName = 'AppBar';

  static propTypes =  {
    children: PropTypes.node,
    className: PropTypes.string,
    iconClassNameLeft: PropTypes.string,
    iconClassNameRight: PropTypes.string,
    iconElementLeft: PropTypes.element,
    iconElementRight: PropTypes.element,
    iconStyleLeft: PropTypes.object,
    iconStyleRight: PropTypes.object,
    onLeftIconButtonTouchTap: PropTypes.func,
    onRightIconButtonTouchTap: PropTypes.func,
    onTitleTouchTap: PropTypes.func,
    showMenuIconButton: PropTypes.bool,
    style: PropTypes.object,
    title: PropTypes.node,
    titleStyle: PropTypes.object,
    zDepth: propTypes.zDepth,

  };

  static defaultProps = {
    showMenuIconButton: true,
    title: '',
    zDepth: 1,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  componentDidMount() {
    warning(!this.props.iconElementLeft || !this.props.iconClassNameLeft, `Material-UI: Properties iconElementLeft
      and iconClassNameLeft cannot be simultaneously defined. Please use one or the other.`);

    warning(!this.props.iconElementRight || !this.props.iconClassNameRight, `Material-UI: Properties iconElementRight
      and iconClassNameRight cannot be simultaneously defined. Please use one or the other.`);
  }

  handleTouchTapLeftIconButton = (event) => {
    if (this.props.onLeftIconButtonTouchTap) {
      this.props.onLeftIconButtonTouchTap(event);
    }
  }

  handleTouchTapRightIconButton = (event) => {
    if (this.props.onRightIconButtonTouchTap) {
      this.props.onRightIconButtonTouchTap(event);
    }
  }

  
  render() {
    
    const {
      title,
      titleStyle,
      iconStyleLeft,
      iconStyleRight,
      onTitleTouchTap,
      showMenuIconButton,
      iconElementLeft,
      iconElementRight,
      iconClassNameLeft,
      iconClassNameRight,
      onLeftIconButtonTouchTap,
      onRightIconButtonTouchTap,
      className,
      style,
      zDepth,
      children,
      ...other
    } = this.props;

    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context);

    let menuElementLeft;
    let menuElementRight;

    const titleComponent = typeof title === 'string' || title instanceof String ? 'h1' : 'div';

    const titleElement = React.createElement(titleComponent, {
      onTouchTap: this.handleTitleTouchTap,
      style: prepareStyles(Object.assign(styles.title, styles.mainElement, titleStyle)),
    }, title);

    const iconLeftStyle = Object.assign({}, styles.iconButtonStyle, iconStyleLeft);

    if (showMenuIconButton) {
      if (iconElementLeft) {

      } else {
        menuElementLeft = (
          <IconButton 
            style={iconLeftStyle}
            iconStyle={styles.iconButtonIconStyle}
            iconClassName={iconClassNameLeft}
            onTouchTap={this.handleTouchTapLeftIconButton}
          >
            {iconClassNameLeft ?
              '' :
              <NavigationMenu style={Object.assign({}, styles.iconButtonIconStyle)} />              
            }
          </IconButton>
        );
      }
    }

    const iconRightStyle = Object.assign({}, styles.iconButtonStyle, {
      marginRight: -16,
      marginLeft: 'auto',
    }, iconStyleRight);


    if (iconElementRight) {
      const iconElementRightProps = {};

      switch(iconElementRight.type.muiName) {
        case 'IconMenu':
        case 'IconButton':
          const iconElementRightChildren = iconElementRight.props.children;
          const iconButtonIconStyle = !(
            iconElementRightChildren &&
            iconElementRightChildren.props &&
            iconElementRightChildren.props.color
          ) ? styles.iconButtonIconStyle : null;

          iconElementRightProps.iconStyle = Object.assign({}, iconButtonIconStyle, iconElementRight.props.iconStyle);
          break;
        
        case 'FlatButton':
          iconElementRightProps.style = Object.assign({}, styles.flatButton, iconElementRight.props.style);
          break;
          
        default:
      }

      if (!iconElementRight.props.onTouchTap && this.props.onRightIconButtonTouchTap) {
        iconElementRightProps.onTouchTap = this.handleTouchTapRightIconButton;
      }

      menuElementRight = (
        <div style={prepareStyles(iconRightStyle)}>
          {
            Object.keys(iconElementRightProps).length > 0 ?
              cloneElement(iconElementRight, iconElementRightProps) :
              iconElementRight
          }
        </div>
      );


    } else if(iconClassNameRight) {
      menuElementRight = (
        <IconButton
          style={iconRightStyle}
          iconStyle={styles.iconButtonIconStyle}
          iconClassName={iconClassNameRight}
          onTouchTap={this.handleTouchTapRightIconButton}
        />
      );
    }

    return (
      <Paper
        {...other}
        rounded={false}
        className={className}
        style={Object.assign({}, styles.root, style)}
        zDepth={zDepth}
      >
        {menuElementLeft}
        {titleElement}
        {menuElementRight}
        {children}
      </Paper>
    );
  }
}

export default AppBar;