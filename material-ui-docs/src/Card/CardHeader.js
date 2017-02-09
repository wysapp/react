import React, {Component, PropTypes, isValidElement } from 'react';
import Avatar from '../Avatar';

function getStyles(props, context) {
  const {card} = context.muiTheme;

  return {
    root: {
      padding: 16,
      fontWeight: card.fontWeight,
      boxSizing: 'border-box',
      position: 'relative',
      whiteSpace: 'nowrap',
    },
    text: {
      display: 'inline-block',
      verticalAlign: 'top',
      whiteSpace: 'normal',
      paddingRight: '90px',
    },
    avatar: {
      marginRight: 16,
    },
    title: {
      color: props.titleColor || card.titleColor,
      display: 'block',
      fontSize: 15,
    },
    subtitle: {
      color: props.subtitleColor || card.subtitleColor,
      display: 'block',
      fontSize: 14,
    },
  };
}


class CardHeader extends Component {
  static muiName = 'CardHeader';

  static propTypes = {
    actAsExpander: PropTypes.bool,
    avatar: PropTypes.node,
    children: PropTypes.node,
    closeIcon: PropTypes.node,
    expandable:PropTypes.bool,
    openIcon: PropTypes.node,
    showExpandableButton: PropTypes.bool,
    style: PropTypes.object,
    subtitle: PropTypes.node,
    subtitleColor: PropTypes.string,
    subtitleStyle: PropTypes.object,
    textStyle: PropTypes.object,
    title: PropTypes.node,
    titleColor: PropTypes.string,
    titleStyle: PropTypes.object,
  };

  static defaultProps = {
    avatar: null,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  render() {

    const {
      actAsExpander,
      avatar: avatarProp,
      children,
      closeIcon,
      expandable,
      openIcon,
      showExpandableButton,
      style,
      subtitle,
      subtitleStyle,
      subtitleColor,
      textStyle,
      title,
      titleColor,
      titleStyle,
      ...other
    } = this.props;

    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context);

    let avatar = avatarProp;

    if (isValidElement(avatar)){ 
      avatar = React.cloneElement(avatar, {
        style: Object.assign(styles.avatar, avatar.props.style),
      });
    } else if (avatar !== null) {
      avatar = <Avatar src={avatarProp} style={styles.avatar} />;
    }

    return (
      <div {...other} style={prepareStyles(Object.assign(styles.root, style))}>
        {avatar}
        <div style={prepareStyles(Object.assign(styles.text, textStyle))}>
          <span style={prepareStyles(Object.assign(styles.title, titleStyle))}>
            {title}
          </span>
          <span style={prepareStyles(Object.assign(styles.subtitle, subtitleStyle))}>
            {subtitle}
          </span>
        </div>
        {children}
      </div>
    );

  }

}

export default CardHeader;