import React, {PropTypes} from 'react';
import transitions from '../styles/transitions';
import withWidth, {SMALL} from '../utils/withWidth';
import FlatButton from '../FlatButton';

function getStyles(props, context) {
  const {open, width} = props;

  const {
    muiTheme: {
      baseTheme: {
        spacing: {
          desktopGutter,
          desktopSubheaderHeight,
        },
        fontFamily,
      },
      snackbar: {
        backgroundColor,
        textColor,
        actionColor,
      },
    },
  } = context;

  const isSmall = width === SMALL;

  const styles = {
    root: {
      fontFamily: fontFamily,
      backgroundColor: backgroundColor,
      padding: `0 ${desktopGutter}px`,
      height: desktopSubheaderHeight,
      lineHeight: `${desktopSubheaderHeight}px`,
      borderRadius: isSmall ? 0 : 2,
      maxWidth: isSmall ? 'inherit' : 568,
      minWidth: isSmall ? 'inherit' : 288,
      width: isSmall ? `calc(100vw - ${desktopGutter * 2}px)` : 'auto',
      flexGrow: isSmall ? 1 : 0,
    },
    content: {
      fontSize: 14,
      color: textColor,
      opacity: open ? 1 : 0,
      transition: open ?
        transitions.easeOut('500ms', 'opacity', '100ms') :
        transitions.easeOut('400ms', 'opacity'),
    },
    action: {
      color: actionColor,
      float: 'right',
      marginTop: 6,
      marginRight: -16,
      marginLeft: desktopGutter,
      backgroundColor: 'transparent',
    },
  };

  return styles;
}

export const SnackbarBody = (props, context) => {
  const {
    action,
    contentStyle,
    message,
    open,
    onActionTouchTap,
    style,
    ...other
  } = props;

  const {prepareStyles} = context.muiTheme;
  const styles = getStyles(props, context);

  const actionButton = action && (
    <FlatButton 
      style={styles.action}
      label={action}
      onTouchTap={onActionTouchTap}
    />
  );


  return (
    <div {...other} style={prepareStyles(Object.assign(styles.root, style))}>
      <div style={prepareStyles(Object.assign(styles.content, contentStyle))}>
        <span>{message}</span>
        {actionButton}
      </div>
    </div>
  );
};

SnackbarBody.propTypes = {
  action: PropTypes.node,
  contentStyle: PropTypes.object,
  message: PropTypes.node.isRequired,
  onActionTouchTap: PropTypes.func,
  open: PropTypes.bool.isRequired,
  style: PropTypes.object,
  width: PropTypes.number.isRequired,
};

SnackbarBody.contextTypes = {
  muiTheme: PropTypes.object.isRequired,
};

export default withWidth()(SnackbarBody);