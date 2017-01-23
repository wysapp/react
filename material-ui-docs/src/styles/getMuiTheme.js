import merge from 'lodash.merge';
import {darken, fade } from '../utils/colorManipulator';
import lightBaseTheme from './baseThemes/lightBaseTheme';
import zIndex from './zIndex';
import autoprefixer from '../utils/autoprefixer';
import callOnce from '../utils/callOnce';
import rtl from '../utils/rtl';
import compose from 'recompose/compose';
import typography from './typography';

import {
  red500, grey400, grey500, grey600, grey700,
  transparent, lightWhite, white, darkWhite, lightBlack, black,
} from './colors';



export default function getMuiTheme(muiTheme, ...more) {

  muiTheme = merge({
    zIndex,
    isRtl: false,
    userAgent: undefined,
  }, lightBaseTheme, muiTheme, ...more);

  const {spacing, fontFamily, palette} = muiTheme;
  const baseTheme = { spacing, fontFamily, palette};

  muiTheme = merge({

    appBar: {
      color: palette.primary1Color,
      textColor: palette.alternateTextColor,
      height: spacing.desktopKeylineIncrement,
      titleFontWeight: typography.fontWeightNormal,
      padding: spacing.desktopGutter,
    },

    button: {
      height: 36,
      minWidth: 88,
      iconButtonSize: spacing.iconSize * 2,
    },

    dialog: {
      titleFontSize: 22,
      bodyFontSize: 16,
      bodyColor: fade(palette.textColor, 0.6),
    },

    enhancedButton: {
      tapHighlightColor: transparent,
    },

    flatButton: {
      color: transparent,
      buttonFilterColor: '#999999',
      disabledTextColor: fade(palette.textColor, 0.3),
      textColor: palette.textColor,
      primaryTextColor: palette.primary1Color,
      secondaryTextColor: palette.accent1Color,
      fontSize: typography.fontStyleButtonFontSize,
      fontWeight: typography.fontWeightMedium,
    },

    drawer: {
      width: spacing.desktopKeylineIncrement * 4,
      color: palette.canvasColor,
    },

    overlay: {
      backgroundColor: lightBlack,
    },

    paper: {
      color: palette.textColor,
      backgroundColor: palette.canvasColor,
      zDepthShadows: [
        [1, 6, 0.12, 1, 4, 0.12],
        [3, 10, 0.16, 3, 10, 0.23],
        [10, 30, 0.19, 6, 10, 0.23],
        [14, 45, 0.25, 10, 18, 0.22],
        [19, 60, 0.30, 15, 20, 0.22],
      ].map((d) => (
        `0 ${d[0]}px ${d[1]}px ${fade(palette.shadowColor, d[2])},
         0 ${d[3]}px ${d[4]}px ${fade(palette.shadowColor, d[5])}`
      )),
    },
    
    raisedButton: {
      color: palette.alternateTextColor,
      textColor: palette.textColor,
      primaryColor: palette.primary1Color,
      primaryTextColor: palette.alternateTextColor,
      secondaryColor: palette.accent1Color,
      secondaryTextColor: palette.alternateTextColor,
      disabledColor: darken(palette.alternateTextColor, 0.1),
      disabledTextColor: fade(palette.textColor, 0.3),
      fontSize: typography.fontStyleButtonFontSize,
      fontWeight: typography.fontWeightMedium,
    },

    ripple: {
      color: fade(palette.textColor, 0.87),
    },

    svgIcon: {
      color: palette.textColor,
    },

    tooltip: {
      color: white,
      rippleBackgroundColor: grey700,
    },

  }, muiTheme, {
    baseTheme,
    rawTheme: baseTheme,
  });

  const transformers = [autoprefixer, rtl, callOnce]
    .map((t) => t(muiTheme))
    .filter((t) => t);
  
  muiTheme.prepareStyles = compose(...transformers);
  
  return muiTheme;
};