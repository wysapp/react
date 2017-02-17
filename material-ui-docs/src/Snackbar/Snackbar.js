import React, {Component, PropTypes } from 'react';
import transitions from '../styles/transitions';
import ClickAwayListener from '../internal/ClickAwayListener';
import SnackbarBody from './SnackbarBody';

function getStyles(props, context, state) {
  const {
    muiTheme: {
      baseTheme: {
        spacing: {
          desktopSubheaderHeight,
        },
      },
      zIndex,
    },
  } = context;

  const {open} = state;

  const styles = {
    root: {
      position: 'fixed',
      left: '50%',
      display: 'flex',
      bottom: 0,
      zIndex: zIndex.snackbar,
      visibility: open ? 'visible' : 'hidden',
      transform: open ?
        'translate(-50%, 0)' :
        `translate(-50%, ${desktopSubheaderHeight}px)`,
      transition: `${transitions.easeOut('400ms', 'transform')}, ${transitions.easeOut('400ms', 'visibility')}`,
    },
  };

  return styles;
}

class Snackbar extends Component {

  static propTypes = {
    action: PropTypes.node,
    autoHideDuration: PropTypes.number,
    bodyStyle: PropTypes.object,
    className: PropTypes.string,
    contentStyle: PropTypes.object,
    message: PropTypes.node.isRequired,
    onActionTouchTap: PropTypes.func,
    onRequestClose: PropTypes.func,
    open:PropTypes.bool.isRequired,
    style: PropTypes.object,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  componentWillMount() {
    this.setState({
      open: this.props.open,
      message: this.props.message,
      action: this.props.action,
    });
  }

  componentDidMount() {
    if (this.state.open) {
      this.setAutoHideTimer();
      this.setTransitionTimer();
    }
  }

  componentWillReceiveProps(nextProps){

    if (this.props.open && nextProps.open && (nextProps.message !== this.props.message || nextProps.action !== this.props.action)) {
      console.log('3333333333333333333333333333333333333');
      this.setState({
        open: false,
      });

      clearTimeout(this.timerOneAtTheTimeId);
      this.timerOneAtTheTimeId = setTimeout(() => {
        this.setState({
          message: nextProps.message,
          action: nextProps.action,
          open: true,
        });
      }, 400);

    } else {
      const open = nextProps.open;

      this.setState({
        open: open !== null ? open : this.state.open,
        message: nextProps.message,
        action: nextProps.action,
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.open !== this.state.open) {
      if (this.state.open) {
        this.setAutoHideTimer();
        this.setTransitionTimer();
      } else {
        clearTimeout(this.timerAutoHideId);
      }
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timerAutoHideId);
    clearTimeout(this.timerTransitionId);
    clearTimeout(this.timerOneAtTheTimeId);
  }



  componentClickAway = () => {
    
    if (this.timerTransitionId) {
      return;
    }

    if (this.props.open !== null && this.props.onRequestClose) {
      this.props.onRequestClose('clickaway');
    } else {
      this.setState({open: false});
    }
  }

  setAutoHideTimer() {
    const autoHideDuration = this.props.autoHideDuration;

    if (autoHideDuration > 0) {
      
      clearTimeout(this.timerAutoHideId);
      this.timerAutoHideId = setTimeout(() => {
        
        if (this.props.open !== null && this.props.onRequestClose) {
          
          this.props.onRequestClose('timeout');
        } else {
          this.setState({open: false});
        }
      }, autoHideDuration);
    }
  }

  setTransitionTimer() {
    this.timerTransitionId = setTimeout(() => {
      this.timerTransitionId = undefined;
    }, 400);
  }

  render() {

    const {
      autoHideDuration,
      contentStyle,
      bodyStyle,
      message: messageProp,
      onRequestClose,
      onActionTouchTap,
      style,
      ...other
    } = this.props;

    const {
      action,
      message,
      open 
    } = this.state;

    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context, this.state);

    return (
      <ClickAwayListener onClickAway={open ? this.componentClickAway : null}>
        <div {...other} style={prepareStyles(Object.assign(styles.root, style))}>
          <SnackbarBody
            action={action}
            contentStyle={contentStyle}
            message={message}
            open={open}
            onActionTouchTap={onActionTouchTap}
            style={bodyStyle}
          />
        </div>
      </ClickAwayListener>
    );
  }
}

export default Snackbar;