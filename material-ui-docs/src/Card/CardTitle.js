import React, {Component, PropTypes } from 'react';

function getStyles(props, context) {
  const {card} = context.muiTheme;

  return {
    root: {
      padding: 16,
      position: 'relative',
    },
    title: {
      fontSize: 24,
      color: props.titleColor || card.titleColor,
      display: 'block',
      lineHeight: '36px',
    },
    subtitle: {
      fontSize: 14,
      color: props.subtitleColor || card.subtitleColor,
      display: 'block',
    },
  };
}


class CardTitle extends Component {
  static muiName = 'CardTitle';

  static propTypes = {
    actAsExpander: PropTypes.bool,
    children: PropTypes.node,
    expandable: PropTypes.bool,
    showExpandableButton: PropTypes.bool,
    style: PropTypes.object,
    subtitle: PropTypes.node,
    subtitleColor: PropTypes.string,
    subtitleStyle: PropTypes.object,
    title: PropTypes.node,
    titleColor: PropTypes.string,
    titleStyle: PropTypes.object,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  render() {
    const {
      actAsExpander,
      children,
      expandable,
      showExpandableButton,
      style,
      subtitle,
      subtitleColor,
      subtitleStyle,
      title,
      titleColor,
      titleStyle,
      ...other
    } = this.props;

    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context);
    const rootStyle = Object.assign({}, styles.root, style);
    const extendedTitleStyle = Object.assign({}, styles.title, titleStyle);
    const extendedSubtitleStyle = Object.assign({}, styles.subtitle, subtitleStyle);

    return (
      <div {...other} style={prepareStyles(rootStyle)}>
        <span style={prepareStyles(extendedTitleStyle)}>
          {title}
        </span>
        <span style={prepareStyles(extendedSubtitleStyle)}>
          {subtitle}
        </span>
        {children}
      </div>
    );
  }
}

export default CardTitle;