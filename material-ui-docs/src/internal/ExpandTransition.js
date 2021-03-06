import React,{Component, PropTypes} from 'react';
import ReactTransitionGroup from 'react-addons-transition-group';
import ExpandTransitionChild from './ExpandTransitionChild';

class ExpandTransition extends Component {
  static propTypes = {
    children: PropTypes.node,
    enterDelay: PropTypes.number,
    loading: PropTypes.bool,
    open: PropTypes.bool,
    style: PropTypes.object,
    transitionDelay: PropTypes.number,
    transitionDuration: PropTypes.number,
  };

  static defaultProps = {
    enterDelay: 0,
    transitionDelay: 0,
    transitionDuration: 450,
    loading: false,
    open: false,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  renderChildren(children) {
    const {enterDelay, transitionDelay, transitionDuration} = this.props;
    return React.Children.map(children, (child) => {
      return (
        <ExpandTransitionChild 
          enterDelay={enterDelay}
          transitionDelay={transitionDelay}
          transitionDuration={transitionDuration}
          key={child.key}
        >
          {child}
        </ExpandTransitionChild>
      );
    }, this);
  }

  render() {
    const {
      children,
      enterDelay,
      loading,
      open,
      style,
      transitionDelay,
      transitionDuration,
      ...other
    } = this.props;

    const {prepareStyles} = this.context.muiTheme;

    const mergedRootStyles = Object.assign({},{
      position: 'relative',
      overflow: 'hidden',
      height: 'auto',
    }, style);

    const newChildren = loading ? [] : this.renderChildren(children);

    return (
      <ReactTransitionGroup
        style={prepareStyles(mergedRootStyles)}
        component="div"
        {...other}
      >
        {open && newChildren}
      </ReactTransitionGroup>
    );
  }
}

export default ExpandTransition;