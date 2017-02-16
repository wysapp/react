import React, {Component, PropTypes } from 'react';
import RadioButton from './RadioButton';
import warning from 'warning';

class RadioButtonGroup extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    defaultSelected: PropTypes.any,
    labelPosition: PropTypes.oneOf(['left','right']),
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    style: PropTypes.object,
    valueSelected: PropTypes.any,
  };

  static defaultProps = {
    style: {},
  };

  static contextTypes = {
    muiTheme:PropTypes.object.isRequired,
  };

  state = {
    numberCheckedRadioButtons: 0,
    selected: '',
  };

  render() {
    const {prepareStyles} = this.context.muiTheme;

    const options = React.Children.map(this.props.children, (option) => {
      const {
        name,
        value,
        label,
        onCheck,
        ...other
      } = option.props;

      return (
        <RadioButton 
          {...other}
          ref={option.props.value}
          name={this.props.name}
          key={option.props.value}
          value={option.props.value}
          label={option.props.label}
          labelPosition={option.props.labelPosition}
          onCheck={this.handleChange}
          checked={option.props.value === this.state.selected}
        />
      );
    }, this);

    return (
      <div  
        style={prepareStyles(Object.assign({}, this.props.style))}
        className={this.props.className}
      >
        {options}
      </div>
    );
  }
}

export default RadioButtonGroup;