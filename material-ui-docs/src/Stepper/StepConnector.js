import React, {PropTypes} from 'react';
import pure from 'recompose/pure';

const propTypes = {
  style: PropTypes.object,
};

const contextTypes = {
  muiTheme: PropTypes.object.isRequired,
  stepper: PropTypes.object,
};

const StepConnector = (props, context) => {
  const {muiTheme, stepper} = context;

  const styles = {
    wrapper: {
      flex: '1 1 auto',
    },
    line: {
      display: 'block',
      borderColor: muiTheme.stepper.connectorLineColor,
    },
  };

  if (stepper.orientation === 'horizontal') {
    styles.line.marginLeft = -6;
    styles.line.borderTopStyle = 'solid';
    styles.line.borderTopWidth = 1;
  } else if (stepper.orientation === 'vertical') {
    styles.wrapper.marginLeft = 14 + 11;
    styles.line.borderLeftStyle = 'solid';
    styles.line.borderLeftWidth = 1;
    styles.line.minHeight = 28;
  }

  const {prepareStyles} = muiTheme;

  return (
    <div style={prepareStyles(styles.wrapper)}>
      <span style={prepareStyles(styles.line)} />
    </div>
  );
}

StepConnector.propTypes = propTypes;
StepConnector.contextTypes = contextTypes;

export {StepConnector as PlainStepConnector};
export default pure(StepConnector);