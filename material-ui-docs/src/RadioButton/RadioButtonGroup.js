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

  componentWillMount() {
    let cnt = 0;
    let selected = '';
    const {valueSelected, defaultSelected} = this.props;
    if (valueSelected !== undefined) {
      selected = valueSelected;
    } else if (defaultSelected !== undefined) {
      selected = defaultSelected;
    }

    React.Children.forEach(this.props.children, (option) => {
      if (this.hasCheckAttribute(option)) cnt++;
    }, this);

    this.setState({
      numberCheckedRadioButtons: cnt,
      selected,
    })
  }

  componentWillReceiveProps(nextProps) {
    console.log('3333333333333333-RadioButtonGroup-componentWillReceiveProps');
  }

  hasCheckAttribute(radioButton) {
    return radioButton.props.hasOwnProperty('checked') && radioButton.props.checked;
  }

  updateRadioButtons(newSelection) {
    if (this.state.numberCheckedRadioButtons === 0) {
      this.setState({selected: newSelection});
    } else {
      warning(false, `Material-UI: Cannot select a different radio button while another radio button
        has the 'checked' property set to true.`);
    }
  }

  handleChange = (event, newSelection) => {
    this.updateRadioButtons(newSelection);

    if (this.state.numberCheckedRadioButtons === 0) {
      if (this.props.onChange) 
        this.props.onChange(event, newSelection);
    }
  }

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
          labelPosition={this.props.labelPosition}
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