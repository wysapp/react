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

  componentWillMount() {
    this.requestsList = [];
    this.setState({
      open: this.props.open,
      searchText: this.props.searchText,
    });
    this.timerTouchTapCloseId = null;
  }

  componentWillReceiveProps(nextProps) {
    console.log('1111111111111111111-componentWillReceiveProps', nextProps);
    if (this.props.searchText !== nextProps.searchText) {
      this.setState({
        searchText: nextProps.searchText,
      });
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timerTouchTapCloseId);
    clearTimeout(this.timerBlurClose);
  }

  close() {
    this.setState({
      open: false,
      anchorEl: null,
    });

    if (this.props.onClose) {
      this.props.onClose();
    }
  }

  handleChange = (event) => {

    const searchText = event.target.value;
    if (searchText === this.state.searchText) {
      return;
    }

    this.setState({
      searchText: searchText,
      open: true,
      anchorEl: ReactDOM.findDOMNode(this.refs.searchTextField),
    }, () => {
      this.props.onUpdateInput(searchText, this.props.dataSource, {
        source: 'change',
      });
    });
  }

  handleBlur = (event) => {
    
    if (this.state.focusTextField && this.timerTouchTapCloseId === null) {
      this.timerBlurClose = setTimeout(() => {
        this.close();
      }, 0);
    }

    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  }

  handleFocus = (event) => {
    if (!this.state.open && this.props.openOnFocus) {
      this.setState({
        open: true,
        anchorEl: ReactDOM.findDOMNode(this.refs.searchTextField),
      });
    }

    this.setState({
      focusTextField: true,
    })

    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  }

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

    const requestsList = [];

    dataSource.every((item, index) => {
      switch(typeof item) {
        case 'string':
          if (filter(searchText, item, item)) {
            requestsList.push({
              text: item,
              value: (
                <MenuItem 
                  innerDivStyle={styles.innerDiv}
                  value={item}
                  primaryText={item}
                  disableFocusRipple={disableFocusRipple}
                  key={index}
                />
              ),
            });
          }

          break;
        
        case 'object':
          if (item && typeof item[this.props.dataSourceConfig.text] === 'string') {
            const itemText = item[this.props.dataSourceConfig.text];
            if (!this.props.filter(searchText, itemText, item)) break;

            const itemValue = item[this.props.dataSourceConfig.value];
            if (itemValue.type && (itemValue.type.muiName === MenuItem.muiName || itemValue.type.muiName === Divider.muiName)) {
              requestsList.push({
                text: itemText,
                value: React.cloneElement(itemValue, {
                  key: index,
                  disableFocusRipple: disableFocusRipple,
                }),
              });
            } else {
              requestsList.push({
                text: itemText,
                value: (
                  <MenuItem 
                    innerDivStyle={styles.innerDiv}
                    primaryText={itemText}
                    disableFocusRipple={disableFocusRipple}
                    key={index}
                  />
                ),
              });
            }
          }

          break;
        default:
      }

      return !(maxSearchResults && maxSearchResults > 0 && requestsList.length === maxSearchResults);
    })

    this.requestsList = requestsList;

    const menu = open && requestsList.length > 0 && (
      <Menu 
        {...menuProps}
        ref="menu"
        autoWidth={false}
        disableAutoFocus={focusTextField}
        onEscKeyDown={this.handleEscKeyDown}
        initiallyKeyboardFocused={true}
        onItemTouchTap={this.handleItemTouchTap}
        onMouseDown={this.handleMouseDown}
        style={Object.assign(styles.menu, menuStyle)}
        listStyle={Object.assign(styles.list, listStyle)}
      >
        {requestsList.map((i) => i.value)}
      </Menu>
    );


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
        <Popover 
          style={Object.assign({}, styles.popover, popoverStyle)}
          canAutoPosition={false}
          anchorOrigin={anchorOrigin}
          targetOrigin={targetOrigin}
          open={open}
          anchorEl={anchorEl}
          useLayerForClickAway={false}
          onRequestClose={this.handleRequestClose}
          animated={animated}
          animation={animation}
          {...popoverOther}
        >
          {menu}
        </Popover>
      </div>
    );
  }
}

export default AutoComplete;