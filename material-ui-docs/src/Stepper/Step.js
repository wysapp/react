import React, {Component, PropTypes} from 'react';

const getStyles = ({index}, {stepper}) => {
  const {orientation} = stepper;
  const styles = {
    root: {
      flex: '0 0 auto',
    },
  };

  if (index > 0) {
    if (orientation === 'horizontal') {
      styles.root.marginLeft = -6;
    } else if (orientation === 'vertical') {
      styles.root.marginTop = -14;
    }
  }

  return styles;
};

class Step extends Component {
  static propTypes = {
    active: PropTypes.bool,
    children: PropTypes.node,
    completed: PropTypes.bool,
    disabled: PropTypes.bool,
    index: PropTypes.number,
    last: PropTypes.bool,
    style: PropTypes.object,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
    stepper: PropTypes.object,
  };

  renderChild = (child) => {
    const {
      active,
      completed,
      disabled,
      index,
      last,
    } = this.props;

    const icon = index + 1;

    return React.cloneElement(child, Object.assign(
      {active, completed, disabled, icon, last},
      child.props
    ));
  }

  render() {
    const {
      active,
      completed,
      disabled,
      index,
      last,
      children,
      style,
      ...other
    } = this.props;

    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context);

    return (
      <div style={prepareStyles(Object.assign(styles.root, style))} {...other}>
        {React.Children.map(children, this.renderChild)}
      </div>
    );
  }
}

export default Step;