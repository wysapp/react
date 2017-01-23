import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import EventListener from 'react-event-listener';
import keycode from 'keycode';
import transitions from '../styles/transitions';
import Overlay from '../internal/Overlay';
import Paper from '../Paper';
import propTypes from '../utils/propTypes';

let openNavEventHandler = null;

class Drawer extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    containerClassName: PropTypes.string,
    containerStyle: PropTypes.object,
    disableSwipeToOpen: PropTypes.bool,
    docked: PropTypes.bool,

    onRequestChange: PropTypes.func,
    open: PropTypes.bool,
    openSecondary: PropTypes.bool,

    overlayClassName: PropTypes.string,
    overlayStyle: PropTypes.object,
    style: PropTypes.object,

    swipeAreaWidth: PropTypes.number,
    width: PropTypes.number,
    zDepth: propTypes.zDepth,
  };

  static defaultProps = {
    disableSwipeToOpen: false,
    docked: true,
    open: null,
    openSecondary: false,
    swipeAreaWidth: 30,
    width: null,
    zDepth: 2,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  componentWillMount() {
    this.maybeSwiping = false;
    this.touchStartX = null;
    this.touchStartY = null;
    this.swipeStartX = null;

    this.setState({
      open: (this.props.open !== null) ? this.props.open : this.props.docked,
      swiping: null,
    });
  }

  getStyles() {
    const muiTheme = this.context.muiTheme;
    const theme = muiTheme.drawer;

    const x = this.getTranslateMultiplier() * (this.state.open ? 0 : this.getMaxTranslateX());

    const styles = {
      root: {
        height: '100%',
        width: this.props.width || theme.width,
        position: 'fixed',
        zIndex: muiTheme.zIndex.drawer,
        left: 0,
        top: 0,
        transform: `translate(${x}px, 0)`,
        transition: !this.state.swiping && transitions.easeOut(null, 'transform', null),
        backgroundColor: theme.color,
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
      },
      overlay: {
        zIndex: muiTheme.zIndex.drawerOverlay,
        pointerEvents: this.state.open ? 'auto' : 'none',
      },
      rootWhenOpenRight: {
        left: 'auto',
        right: 0,
      },
    };

    return styles;

  }

  shouldShow() {
    return this.state.open || !this.state.swiping;
  }

  getMaxTranslateX() {
    const width = this.props.width || this.context.muiTheme.drawer.width;
    return width + 10;
  }

  getTranslateMultiplier() {
    return this.props.openSecondary ? 1 : -1;
  }

  render(){
    const {
      children,
      className,
      containerClassName,
      containerStyle,
      docked,
      openSecondary,
      overlayClassName,
      overlayStyle,
      style,
      zDepth,
    } = this.props;

    const styles = this.getStyles();

    let overlay;
    if (!docked) {
      overlay = (
        <Overlay 
          ref="overlay"
          show={this.shouldShow()}
          className={overlayClassName}
          style={Object.assign(styles.overlay, overlayStyle)}
          transitionEnabled={!this.state.swiping}
          onTouchTap={this.handleTouchTapOverlay}
        />
      );
    }

    return (
      <div 
        className={className}
        style={style}
      >
        <EventListener target="window" onKeyUp={this.handleKeyUp} />
        {overlay}
        <Paper 
          ref="clickAwayableElement"
          zDepth={zDepth}
          rounded={false}
          transitionEnabled={!this.state.swiping}
          className={containerClassName}
          style={Object.assign(styles.root, openSecondary && styles.rootWhenOpenRight, containerStyle)}
        >
          {children}
        </Paper>
      </div>
    );
  }
}

export default Drawer;