import React, {Component, PropTypes} from 'react';

function getStyles(props, context) {
  const {cardText} = context.muiTheme;

  return {
    root: {
      padding: 16,
      fontSize: 14,
      color: props.color || cardText.textColor,
    },
  };
}

class CardText extends Component {
  static muiName = 'CardText';

  static propTypes = {
    actAsExpander: PropTypes.bool,
    children: PropTypes.node,
    color: PropTypes.string,
    expandable: PropTypes.bool,
    style: PropTypes.object,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  render() {
    const {
      actAsExpander,
      children,
      color,
      expandable,
      style,
      ...other
    } = this.props;

    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context);

    const rootStyle = Object.assign(styles.root, style);

    return (
      <div {...other} style={prepareStyles(rootStyle)}>
        {children}
      </div>
    );
  }
}

export default CardText;