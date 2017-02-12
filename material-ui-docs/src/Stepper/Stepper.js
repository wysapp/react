import React, {Component, PropTypes, Children} from 'react';
import StepConnector from './StepConnector';


const getStyles = (props) => {
  const {orientation} = props;

  return {
    root: {
      display: 'flex',
      flexDirection: orientation === 'horizontal' ? 'row' : 'column',
      alignContent: 'center',
      alignItems: orientation === 'horizontal' ? 'center' : 'stretch',
      justifyContent: 'space-between',
    },
  };
}

class Stepper extends Component {

  static propTypes = {
    activeStep: PropTypes.number,
    children: PropTypes.arrayOf(PropTypes.node),
    connector: PropTypes.node,
    linear: PropTypes.bool,
    orientation: PropTypes.oneOf(['horizontal', 'vertical']),
    style: PropTypes.object,
  };

  static defaultProps = {
    connector: <StepConnector />,
    orientation: 'horizontal',
    linear: true,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  static childContextTypes = {
    stepper: PropTypes.object,
  };

  getChildContext() {
    const {orientation} = this.props;
    return {stepper: {orientation}};
  }

  render() {
    const {
      activeStep,
      children,
      connector,
      linear,
      style,
    } = this.props;

    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context);

    const numChildren = Children.count(children);
    const steps = Children.map(children, (step, index) => {
      const controlProps = {index};

      if (activeStep === index) {
        controlProps.active = true;
      } else if (linear && activeStep > index) {
        controlProps.completed = true;
      } else if (linear && activeStep < index) {
        controlProps.disabled = true;
      }

      if (index + 1 === numChildren) {
        controlProps.last = true;
      }

      return [
        index > 0 && connector,
        React.cloneElement(step, Object.assign(controlProps, step.props)),
      ];
    });

    return (
      <div style={prepareStyles(Object.assign(styles.root, style))}>
        {steps}
      </div>
    );
  }
}

export default Stepper;