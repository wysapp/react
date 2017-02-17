import React, {Component, PropTypes} from 'react';
import TextField from '../TextField';
import DropDownMenu from '../DropDownMenu';


function getStyles(props) {
  return {
    label: {

    },
    icon: {

    },
    hideDropDownUnderline: {

    },
    dropDownMenu: {

    },
  };
}


class SelectField extends Component {
  static propTypes = {
    autoWidth: PropTypes.bool,
    children: PropTypes.node,
    disabled: PropTypes.bool,
    errorStyle: PropTypes.object,
    errorText: PropTypes.node,
    floatingLabelFixed: PropTypes.bool,
    floatingLabelStyle: PropTypes.object,
    floatingLabelText: PropTypes.node,
    fullWidth: PropTypes.bool,
    hintStyle: PropTypes.object,
    hintText: PropTypes.node,
    iconStyle: PropTypes.object,
    id: PropTypes.string,
    labelStyle: PropTypes.object,
    listStyle: PropTypes.object,
    maxHeight:PropTypes.number,
    menuItemStyle: PropTypes.object,
    menuStyle: PropTypes.object,

    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,

    selectedMenuItemStyle: PropTypes.object,
    style:PropTypes.object,
    underlineDisabledStyle: PropTypes.object,
    underlineFocusStyle: PropTypes.object,
    underlineStyle: PropTypes.object,
    value: PropTypes.any,
  };

  static defaultProps = {
    autoWidth: false,
    disabled: false,
    fullWidth: false,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  render() {
    const {
      autoWidth,
      children,
      style,
      labelStyle,
      iconStyle,
      id,
      underlineDisabledStyle,
      underlineFocusStyle,
      menuItemStyle,
      selectedMenuItemStyle,
      underlineStyle,
      errorStyle,
      disabled,
      floatingLabelFixed,
      floatingLabelText,
      floatingLabelStyle,
      hintStyle,
      hintText,
      fullWidth,
      errorText,
      listStyle,
      maxHeight,
      menuStyle,
      onFocus,
      onBlur,
      onChange,
      value,
      ...other
    } = this.props;

    const styles = getStyles(this.props);

    return (
      <TextField 
        {...other}
        style={style}
        disabled={disabled}
        floatingLabelFixed={floatingLabelFixed}
        floatingLabelText={floatingLabelText}
        floatingLabelStyle={floatingLabelStyle}
        hintStyle={hintStyle}
        hintText={hintText}
        fullWidth={fullWidth}
        errorText={errorText}
        underlineStyle={underlineStyle}
        errorStyle={errorStyle}
        onFocus={onfocus}
        onBlur={onBlur}
        id={id}
        underlineDisabledStyle={underlineDisabledStyle}
        underlineFocusStyle={underlineFocusStyle}
      >
        <DropDownMenu
          disabled={disabled}
          style={Object.assign(styles.dropDownMenu, menuStyle)}
          labelStyle={Object.assign(styles.label, labelStyle)}
          iconStyle={Object.assign(styles.icon, iconStyle)}
          menuItemStyle={menuItemStyle}
          selectedMenuItemStyle={selectedMenuItemStyle}
          underlineStyle={styles.hideDropDownUnderline}
          listStyle={listStyle}
          autoWidth={autoWidth}
          value={value}
          onChange={onchange}
          maxHeight={maxHeight}
        >
          {children}
        </DropDownMenu>
      </TextField>
    );
  }
}

export default SelectField;