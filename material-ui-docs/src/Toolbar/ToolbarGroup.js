import React, {Component, PropTypes} from 'react';

function getStyles(props, context) {
  const {
    firstChild,
    lastChild,
  } = props;

  const {
    baseTheme,
    button,
    toolbar,
  } = context.muiTheme;

  const marginHorizontal = baseTheme.spacing.desktopGutter;
  const marginVertical = (toolbar.height - button.height) / 2;

  const styles = {
    root: {
      position: 'relative',
      marginLeft: firstChild ? -marginHorizontal : undefined,
      marginRight: lastChild ? -marginHorizontal : undefined,
      display: 'flex',

      justifyContent: 'space-between',
      alignItems: 'center',
    },
    dropDownMenu: {
      root: {
        color: toolbar.color,
        marginRight: baseTheme.spacing.desktopGutter,
        flex: 1,
        whiteSpace: 'nowrap',
      },
      controlBg: {
        backgroundColor: toolbar.menuHoverColor,
        borderRadius: 0,
      },
      underline: {
        display: 'none',
      },
    },
    button: {
      margin: `${marginVertical}px ${marginHorizontal}px`,
      position: 'relative',
    },
    icon: {
      root: {
        cursor: 'pointer',
        lineHeight: `${toolbar.height}px`,
        paddingLeft: baseTheme.spacing.desktopGutter,
      },
    },
    span: {
      color: toolbar.iconColor,
      lineHeight: `${toolbar.height}px`,
    },
  };

  return styles;
}

class ToolbarGroup extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    firstChild: PropTypes.bool,
    lastChild: PropTypes.bool,
    style: PropTypes.object,
  };

  static defaultProps = {
    firstChild: false,
    lastChild: false,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  handleMouseLeaveFontIcon(style) {
    return (event) => {
      event.target.style.zIndex = 'auto';
      event.target.style.color = style.root.color;
    };
  }

  render() {
    const {
      children,
      className,
      firstChild,
      lastChild,
      style,
      ...other
    } = this.props;

    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context);

    const newChildren = React.Children.map(children, (currentChild) => {
      if (!currentChild) {
        return null;
      }

      if (!currentChild.type) {
        return currentChild;
      }

      switch(currentChild.type.muiName) {
        case 'DropDownMenu':
          return React.cloneElement(currentChild, {
            style: Object.assign({}, styles.dropDownMenu.root, currentChild.props.styles),
            underlineStyle: styles.dropDownMenu.underline,
          });
        case 'RaisedButton':
        case 'FlatButton':
          return React.cloneElement(currentChild, {
            style: Object.assign({}, styles.button, currentChild.props.style),
          });
        case 'FontIcon':
          return React.cloneElement(currentChild, {
            style: Object.assign({}, styles.icon.root, currentChild.props.style),
            color: currentChild.props.color || this.context.muiTheme.toolbar.iconColor,
            hoverColor: currentChild.props.hoverColor || this.context.muiTheme.toolbar.hoverColor,
          });
        case 'ToolbarSeparator':
        case 'ToolbarTitle':
          return React.cloneElement(currentChild, {
            style: Object.assign({}, styles.span, currentChild.props.style),
          });
        default:
          return currentChild;
      }
    })

    return (
      <div {...other} className={className} style={prepareStyles(Object.assign({}, styles.root, style))}>
        {newChildren}
      </div>
    );
  }
}

export default ToolbarGroup;