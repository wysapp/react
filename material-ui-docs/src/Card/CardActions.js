import React, {Component, PropTypes } from 'react';

function getStyles() {

  return {
    root: {
      padding: 8,
      position: 'relative',
    },
    action: {
      marginRight: 8,
    },
  };
}


class CardActions extends Component {
  static propTypes = {
    actAsExpander: PropTypes.bool,
    children: PropTypes.node,
    expandable: PropTypes.bool,
    showExpandableButton: PropTypes.bool,
    style: PropTypes.object,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  render() {
    const {
      actAsExpander,
      children,
      expandable,
      style,
      ...other
    } = this.props;

    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles();

    const styledChildren = React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          style: Object.assign({}, styles.action, child.props.style),
        });
      }
    });

    return (
      <div {...other} style={prepareStyles(Object.assign(styles.root, style))}>
        {styledChildren}
      </div>
    );
  }
}

export default CardActions;