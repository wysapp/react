import React, {Component, PropTypes } from 'react';
import Paper from '../Paper';
import CardExpandable from './CardExpandable';

class Card extends Component {
  static propTypes  = {
    children: PropTypes.node,
    containerStyle: PropTypes.object,
    expandable: PropTypes.bool,
    expanded: PropTypes.bool,
    initiallyExpanded: PropTypes.bool,
    onExpandChange: PropTypes.func,
    showExpandableButton: PropTypes.bool,
    style: PropTypes.object,
  };

  static defaultProps = {
    expandable: false,
    expanded: null,
    initiallyExpanded: false,
  };

  stat = {
    expanded: null,
  };

  componentWillMount() {
    this.setState({
      expanded: this.props.expanded === null ? this.props.initiallyExpanded === true : this.props.expanded,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.expanded !== null) {
      this.setState({expanded: nextProps.expanded});
    }
  }

  handleExpanding = (event) => {
    event.preventDefault();
    const newExpandedState = !this.state.expanded;
    if (this.props.expanded === null) {
      this.setState({expanded: newExpandedState});
    }

    if (this.props.onExpandChange) {
      this.props.onExpandChange(newExpandedState);
    }
  }

  render() {
    const {
      style,
      containerStyle,
      children,
      expandable,
      expanded: expandedProp,
      initiallyExpanded,
      onExpandChange,
      ...other
    } = this.props;

    let lastElement;
    const expanded = this.state.expanded;
    const newChildren = React.Children.map(children, (currentChild) => {
      let doClone = false;
      let newChild = undefined;
      const newProps = {};
      let element = currentChild;
      if (!currentChild || !currentChild.props) {
        return null;
      }

      if (expanded === false && currentChild.props.expandable === true)
        return;
      
      if (currentChild.props.actAsExpander === true) {
        doClone = true;
        newProps.onTouchTap = this.handleExpanding;
        newProps.style = Object.assign({cursor: 'pointer'}, currentChild.props.style);
      }

      if (currentChild.props.showExpandableButton === true) {
        doClone = true;
        newChild = (
          <CardExpandable
            closeIcon={currentChild.props.closeIcon}
            expanded={expanded}
            onExpanding={this.handleExpanding}
            openIcon={currentChild.props.openIcon}
          />
        );
      }

      if ( doClone) {
        element = React.cloneElement(currentChild, newProps, currentChild.props.children, newChild);
      }

      lastElement = element;
      return element;
    }, this);

    const addBottomPadding = (lastElement && (lastElement.type.muiName === 'CardText' || lastElement.type.muiName === 'CardTitle'));

    const mergedStyles = Object.assign({
      zIndex: 1,
    }, style);

    const containerMergedStyles = Object.assign({
      paddingBottom: addBottomPadding ? 8 :0,
    }, containerStyle);

    return (
      <Paper {...other} style={mergedStyles}>
        <div style={containerMergedStyles}>
          {newChildren}
        </div>
      </Paper>
    );
  }
}

export default Card;