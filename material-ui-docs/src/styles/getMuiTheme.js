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

    checkbox: {
      boxColor: palette.textColor,
      checkedColor: palette.primary1Color,
      requiredColor: palette.primary1Color,
      disabledColor: palette.disabledColor,
      labelColor: palette.textColor,
      labelDisabledColor: palette.disabledColor,
    },

    

    dialog: {
      titleFontSize: 22,
      bodyFontSize: 16,
      bodyColor: fade(palette.textColor, 0.6),
    },

    dropDownMenu: {
      accentColor: palette.borderColor,
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

    gridTile: {
      textColor: white,
    },

    icon: {
      color: palette.canvasColor,
      backgroundColor: palette.primary1Color,
    },

    inkBar: {
      backgroundColor: palette.accent1Color,
    },

    drawer: {
      width: spacing.desktopKeylineIncrement * 4,
      color: palette.canvasColor,
    },

    listItem: {
      nestedLevelDepth: 18,
      secondaryTextColor: palette.secondaryTextColor,
      leftIconColor: grey600,
      rightIconColor: grey600,
    },

    menu: {
      backgroundColor: palette.canvasColor,
      containerBackgroundColor: palette.canvasColor,
    },

    menuItem: {
      dataHeight: 32,
      height: 48,
      hoverColor: fade(palette.textColor, 0.1),
      padding: spacing.desktopGutter,
      selectedTextColor: palette.accent1Color,
      rightIconDesktopFill: grey600,
    },

    menuSubheader: {
      padding: spacing.desktopGutter,
      borderColor: palette.borderColor,
      textColor: palette.primary1Color,
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

    subheader: {
      color: fade(palette.textColor, 0.54),
      fontWeight: typography.fontWeightMedium,
    },

    svgIcon: {
      color: palette.textColor,
    },

    tabs: {
      backgroundColor: palette.primary1Color,
      textColor: fade(palette.alternateTextColor, 0.7),
      selectedTextColor: palette.alternateTextColor,
    },

    toggle:{
      thumbOnColor: palette.primary1Color,
      thumbOffColor: palette.accent2Color,
      thumbDisabledColor: palette.borderColor,
      thumbRequiredColor: palette.primary1Color,
      trackOnColor: fade(palette.primary1Color, 0.5),
      trackOffColor: palette.primary3Color,
      trackDisabledColor: palette.primary3Color,
      labelColor: palette.textColor,
      labelDisabledColor: palette.disabledColor,
      trackRequiredColor: fade(palette.primary1Color, 0.5),
    },

    toolbar: {
      color: fade(palette.textColor, 0.54),
      hoverColor: fade(palette.textColor, 0.87),
      backgroundColor: darken(palette.accent2Color, 0.05),
      height: 56,
      titleFontSize: 20,
      iconColor: fade(palette.textColor, 0.4),
      separatorColor: fade(palette.textColor, 0.175),
      menuHoverColor: fade(palette.textColor, 0.1),
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