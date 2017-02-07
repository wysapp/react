import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import EventListener from 'react-event-listener';
import RenderToLayer from '../internal/RenderToLayer';
import propTypes from '../utils/propTypes';
import Paper from '../Paper';
import throttle from 'lodash.throttle';
import PopoverAnimationDefault from './PopoverAnimationDefault';
import { isIOS, getOffsetTop } from '../utils/iOSHelpers';

const styles = {
  root: {
    display: 'none',
  }
};

class Popover extends Component {
  static propTypes = {
    anchorEl: PropTypes.object,
    anchorOrigin: propTypes.origin,
    animated: PropTypes.bool,
    animation: PropTypes.func,
    autoCloseWhenOffScreen: PropTypes.bool,
    canAutoPosition: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string,
    onRequestClose: PropTypes.func,
    open: PropTypes.bool,
    style: PropTypes.object,
    targetOrigin: propTypes.origin,
    useLayerForClickAway: PropTypes.bool,
    zDepth: propTypes.zDepth,
  };

  static defaultProps = {
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'left',
    },
    animated: true,
    autoCloseWhenOffScreen: true,
    canAutoPosition: true,
    onRequestClose: () => {},
    open: false,
    style: {
      overflow: 'auto',
    },
    targetOrigin: {
      vertical: 'top',
      horizontal: 'left',
    },
    useLayerForClickAway: true,
    zDepth: 1,
  };

  static contextTypes ={
    muiTheme: PropTypes.object.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    
    this.handleResize = throttle(this.setPlacement, 100);
    this.handleScroll = throttle(this.setPlacement.bind(this, true), 50);

    this.state = {
      open: props.open,
      closing: false,
    };
  }

  componentDidMount() {
    this.setPlacement();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.open !== this.state.open) {
      if (nextProps.open) {
        this.anchorEl = nextProps.anchorEl || this.props.anchorEl;
        this.setState({
          open: true,
          closing: false,
        });
      } else {
        if (nextProps.animated) {
          if (this.timeout !== null) return;
          this.setState({closing: true});
          this.timeout = setTimeout(() => {
            this.setState({
              open: false,
            }, () => {
              this.timeout = null;
            });
          }, 500);
        } else {
          this.setState({
            open: false,
          });
        }
      }
    }
  }

  componentDidUpdate() {    
    this.setPlacement();
  }
  
  componentWillUnmount() {
    this.handleResize.cancel();
    this.handleScroll.cancel();

    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }  


  timeout = null;

  renderLayer = () => {
    const {
      animated,
      animation,
      anchorEl,
      anchorOrigin,
      autoCloseWhenOffScreen,
      canAutoPosition,
      children,
      onRequestClose,
      style,
      targetOrigin,
      useLayerForClickAway,
      ...other
    } = this.props;

    let styleRoot = style;

    if (!animated) {
      styleRoot = {
        position: 'fixed',
        zIndex: this.context.muiTheme.zIndex.popover,
      };

      if (!this.state.open) {
        return null;
      }

      return (
        <Paper style={Object.assign(styleRoot, style)} {...other}>
          {children}
        </Paper>
      );
    }

    const Animation = animation || PopoverAnimationDefault;

    return (
      <Animation 
        targetOrigin={targetOrigin}
        style={styleRoot}
        {...other}
        open={this.state.open && !this.state.closing}
      >
        {children}
      </Animation>
    );
  }

  requestClose(reason) {
    if (this.props.onRequestClose) {
      this.props.onRequestClose(reason);
    }
  }

  componentClickAway = (event) => {
    event.preventDefault();
    this.requestClose('clickAway');
  }


  getAnchorPosition(el) {
    if (!el) {
      el = ReactDOM.findDOMNode(this);
    }

    const rect = el.getBoundingClientRect();
    const a = {
      top: rect.top,
      left: rect.left,
      width: el.offsetWidth,
      height: el.offsetHeight,
    };

    a.right = rect.right || a.left + a.width;

    if (isIOS() && document.activeElement.tagName === 'INPUT') {
      a.bottom = getOffsetTop(el) + a.height;
    } else {
      a.bottom = rect.bottom || a.top + a.height;
    }

    a.middle = a.left + ((a.right - a.left) / 2);
    a.center = a.top + ((a.bottom - a.top) / 2);

    return a;
  }

  getTargetPosition(targetEl) {
    return {
      top: 0,
      center: targetEl.offsetHeight / 2,
      bottom: targetEl.offsetHeight,
      left: 0,
      middle: targetEl.offsetWidth / 2,
      right: targetEl.offsetWidth,
    };
  }

  setPlacement = (scrolling) => {
    if (!this.state.open) {
      return;
    }

    if (!this.refs.layer.getLayer()) {
      return;
    }

    const targetEl = this.refs.layer.getLayer().children[0];
    if (!targetEl) {
      return;
    }

    const {targetOrigin, anchorOrigin} = this.props;
    const anchorEl = this.props.anchorEl || this.anchorEl;

    const anchor = this.getAnchorPosition(anchorEl);
    let target = this.getTargetPosition(targetEl);

    let targetPosition = {
      top: anchor[anchorOrigin.vertical] - target[targetOrigin.vertical],
      left: anchor[anchorOrigin.horizontal] - target[targetOrigin.horizontal],
    };

    if (scrolling && this.props.autoCloseWhenOffScreen) {
      this.autoCloseWhenOffScreen(anchor);
    }

    if (this.props.canAutoPosition) {
      target = this.getTargetPosition(targetEl); // update as height may have changed
      targetPosition = this.applyAutoPositionIfNeeded(anchor, target, targetOrigin, anchorOrigin, targetPosition);
    }

    targetEl.style.top = `${Math.max(0, targetPosition.top)}px`;
    targetEl.style.left = `${Math.max(0, targetPosition.left)}px`;
    targetEl.style.maxHeight = `${window.innerHeight}px`;
  };

  autoCloseWhenOffScreen(anchorPosition) {
    if (anchorPosition.top < 0 || 
      anchorPosition.top > window.innerHeight ||
      anchorPosition.left < 0 ||
      anchorPosition.left > window.innerWidth 
    )  {
      this.requestClose('offScreen');
    }
  }


  getOverlapMode(anchor, target, median) {
    if ([anchor, target].indexOf(median) >= 0) return 'auto';
    if (anchor === target) return 'inclusive';

    return 'exclusive';
  }

  getPositions(anchor, target) {
    const a = {...anchor};
    const t = {...target};

    const positions = {
      x: ['left', 'right'].filter((p) => p !== t.horizontal),
      y: ['top', 'bottom'].filter((p) => p !== t.vertical),
    };

    const overlap = {
      x: this.getOverlapMode(a.horizontal, t.horizontal, 'middle'),
      y: this.getOverlapMode(a.vertical, t.vertical, 'center'),
    };

    positions.x.splice(overlap.x === 'auto' ? 0 : 1, 0, 'middle');
    positions.y.splice(overlap.y === 'auto' ? 0 : 1, 0, 'center');

    if (overlap.y !== 'auto') {
      a.vertical = a.vertical === 'top' ? 'bottom' : 'top';
      if (overlap.y === 'inclusive') {
        t.vertical = t.vertical;
      }
    }

    if (overlap.x !== 'auot') {
      a.horizontal = a.horizontal === 'left' ? 'right' : 'left';
      if (overlap.y === 'inclusive') {
        t.horizontal = t.horizontal;
      }
    }

    return {
      positions: positions,
      anchorPos: a,
    };
  }

  applyAutoPositionIfNeeded(anchor, target, targetOrigin, anchorOrigin, targetPosition) {
    const { positions, anchorPos } = this.getPositions(anchorOrigin, targetOrigin);

    if(targetPosition.top < 0 || targetPosition.top + target.bottom > window.innerHeight) {
      let newTop = anchor[anchorPos.vertical] - target[positions.y[0]];
      if (newTop + target.bottom <= window.innerHeight) {
        targetPosition.top = Math.max(0, newTop);
      } else {
        newTop = anchor[anchorPos.vertical] - target[positions.y[1]];
        if (newTop + target.bottom <= window.innerHeight) {
          targetPosition.top = Math.max(0, newTop);
        }
      }
    }

    if (targetPosition.left < 0 || targetPosition.left + target.right > window.innerWidth) {
      let newLeft = anchor[anchorPos.horizontal] - target[positions.x[0]];
      if (newLeft + target.right <= window.innerWidth) {
        targetPosition.left = Math.max(0, newLeft);
      } else {
        newLeft = anchor[anchorPos.horizontal] - target[positions.x[1]];
        if (newLeft + target.right <= window.innerWidth) {
          targetPosition.left = Math.max(0, newLeft);
        }
      }
    }

    return targetPosition;
  }


  render() {
    return (
      <div style={styles.root}>
        <EventListener
          target="window"
          onScroll={this.handleScroll}
          onResize={this.handleResize}
        />
        <RenderToLayer
          ref="layer"
          open={this.state.open}
          componentClickAway={this.componentClickAway}
          useLayerForClickAway={this.props.useLayerForClickAway}
          render={this.renderLayer}
        />
      </div>
    );
  }
}

export default Popover;