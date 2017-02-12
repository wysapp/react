import React, {Component, PropTypes} from 'react';
import TransitionComponent from '../internal/ExpandTransition';

import warning from 'warning';

function ExpandTransition(props) {
  return <TransitionComponent {...props} />;
}

const getStyles = (props, context) => {
  const styles = {
    root: {
      marginTop: -14,
      marginLeft: 14 + 11,
      paddingLeft: 24 - 11 + 8,
      paddingRight: 16,
      overflow: 'hidden',
    },
  };

  if (!props.last) {
    styles.root.borderLeft = `1px solid ${context.muiTheme.stepper.connectorLineColor}`;
  }

  return styles;
};


class StepContent extends Component {
  static propTypes = {
    active: PropTypes.bool,
    children: PropTypes.node,
    completed: PropTypes.bool,
    last: PropTypes.bool,
    style: PropTypes.object,
    transition: PropTypes.func,
    transitionDuration: PropTypes.number,
  };

  static defaultProps = {
    transition: ExpandTransition,
    transitionDuration: 450,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
    stepper: PropTypes.object,
  };

  render() {
    const {
      active,
      children,
      completed,
      last,
      style,
      transition,
      transitionDuration,
      ...other
    } = this.props;

    const {stepper, muiTheme: {prepareStyles}} = this.context;

    if (stepper.orientation !== 'vertical') {
      warning(false, 'Material-UI: <StepContent /> is only designed for use with the vertical stepper.');
      return null;
    }
    
    const styles = getStyles(this.props, this.context);
    const transitionProps = {
      enterDelay: transitionDuration,
      transitionDuration: transitionDuration,
      open: active,
    };

    return (
      <div style={prepareStyles(Object.assign(styles.root, style))} {...other}>
        {React.createElement(transition, transitionProps, <div style={{overflow: 'hidden'}}>{children}</div>)}
      </div>
    );
  }
}

export default StepContent;