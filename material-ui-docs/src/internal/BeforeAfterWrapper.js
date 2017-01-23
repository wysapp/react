import React, { Component, PropTypes } from 'react';

const styles = {
  box: {
    boxSizing: 'border-box'
  }
};

class BeforeAfterWrapper extends Component {
  static propTypes = {
    afterElementType: PropTypes.string,
    afterStyle: PropTypes.object,
    beforeElementType: PropTypes.string,
    beforeStyle: PropTypes.object,
    children: PropTypes.node,
    elementType: PropTypes.string,
    style: PropTypes.object,
  };

  static defaultProps = {
    beforeElementType: 'div',
    afterElementType: 'div',
    elementType: 'div',
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  render() {
    const {
      beforeStyle,
      afterStyle,
      beforeElementType,
      afterElementType,
      elementType,
      ...other
    } = this.props;

    const { prepareStyles } = this.context.muiTheme;

    let beforeElement;
    let afterElement;

    if(beforeStyle) {
      beforeElement = React.createElement(this.props.beforeElementType, {
        style: prepareStyles(Object.assign({}, styles.box, beforeStyle)),
        key: '::before',
      });
    }

    if (afterStyle) {
      afterElement = React.createElement(this.props.afterElementType, {
        style: prepareStyles(Object.assign({}, styles.box, afterStyle)),
        key: '::after',
      });
    }

    const children = [beforeElement, this.props.children, afterElement];

    const props = other;
    props.style = prepareStyles(Object.assign({}, this.props.style));

    return React.createElement(this.props.elementType, props, children);
  }
}

export default BeforeAfterWrapper;