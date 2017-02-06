import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import keycode from 'keycode';
import TextField from '../TextField';
import Menu from '../Menu';
import MenuItem from '../MenuItem';
import Divider from '../Divider';
import Popover from '../Popover/Popover';
import propTypes from '../utils/propTypes';

function getStyles(props, context, state) {
  const {anchorEl} = state;
  const {fullWidth} = props;

  const styles = {
    root: {
      display: 'inline-block',
      position: 'relative',
      width: fullWidth ? '100%' : 256,
    },
    menu: {
      width: '100%',
    },
    list: {
      display: 'block',
      width: fullWidth ? '100%' : 256,
    },
    innerDiv: {
      overflow: 'hidden',
    },
  };

  if (anchorEl && fullWidth) {
    styles.popover = {
      width: anchorEl.clientWidth,
    };
  }

  return styles;
}

class AutoComplete extends Component {
  static propTypes = {
    anchorOrigin: propTypes.origin,
    animated: PropTypes.bool,
    animation: PropTypes.func,
    dataSource: PropTypes.array.isRequired,
    dataSourceConfig: PropTypes.object,
    disableFocusRipple: PropTypes.bool,
    errorStyle: PropTypes.object,
    errorText: PropTypes.node,
    filter: PropTypes.func,
    floatingLabelText: PropTypes.node,
    fullWidth: PropTypes.bool,
    hintText: PropTypes.node,
    listStyle: PropTypes.object,
    maxSearchResults: PropTypes.number,
    menuCloseDelay: PropTypes.number,
    menuProps: PropTypes.object,
    menuStyle: PropTypes.object,

    onBlur: PropTypes.func,
    onClose: PropTypes.func,
    onFocus: PropTypes.func,
    onKeyDown:PropTypes.func,
    onNewRequest: PropTypes.func,
    onUpdateInput: PropTypes.func,
    
    open: PropTypes.bool,
    openOnFocus: PropTypes.bool,
    popoverProps: PropTypes.object,
    searchText: PropTypes.string,
    style: PropTypes.object,
    targetOrigin: propTypes.origin,
    textFieldStyle: PropTypes.object,
  };

  static defaultProps = {
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'left',
    },
    animated: true,
    dataSourceConfig: {
      text: 'text',
      value: 'value',
    },
    disableFocusRipple: true,
    filter: (searchText, key) => searchText !== '' && key.indexOf(searchText) !== -1,
    fullWidth: false,
    open: false,
    openOnFocus: false,
    onUpdateInput: () => {},
    onNewRequest: () => {},
    searchText: '',
    menuCloseDelay: 300,
    targetOrigin: {
      vertical: 'top',
      horizontal: 'left',
    },

  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  state = {
    anchorEl: null,
    focusTextField: true,
    open: false,
    searchText: undefined,
  };

  render() {

    const {
      anchorOrigin,
      animated,
      animation,
      dataSource,
      dataSourceConfig,
      disableFocusRipple,
      errorStyle,
      floatingLabelText,
      filter,
      fullWidth,
      style,
      hintText,
      maxSearchResults,
      menuCloseDelay,
      textFieldStyle,
      menuStyle,
      menuProps,
      listStyle,
      targetOrigin,
      onClose,
      onNewRequest,
      onUpdateInput,
      openOnFocus,
      popoverProps,
      searchText: searchTextProp,
      ...other
    } = this.props;

    const {
      style: popoverStyle,
      ...popoverOther
    } = popoverProps || {};

    const {
      open,
      anchorEl,
      searchText,
      focusTextField,
    } = this.state;

    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context, this.state);

    return (
      <div style={prepareStyles(Object.assign(styles.root, style))}>
        <TextField
          {...other}
          ref="searchTextField"
          autoComplete="off"
          value={searchText}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          onKeyDown={this.handleKeyDown}
          floatingLabelText={floatingLabelText}
          hintText={hintText}
          fullWidth={fullWidth}
          multiLine={false}
          errorStyle={errorStyle}
          style={textFieldStyle}
        />
      </div>
    );


  }
}

export default AutoComplete;