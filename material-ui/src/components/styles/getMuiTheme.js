import merge from 'lodash.merge';
import { fade } from '../utils/colorManipulator';
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
    button: {
      height: 36,
      minWidth: 88,
      iconButtonSize: spacing.iconSize * 2,
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