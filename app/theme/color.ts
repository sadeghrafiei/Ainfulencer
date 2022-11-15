import {palette} from './palette';

/**
 * Roles for colors.  Prefer using these over the palette.  It makes it easier
 * to change things.
 *
 * The only roles we need to place in here are the ones that span through the app.
 *
 * If you have a specific use-case, like a spinner color.  It makes more sense to
 * put that in the <Spinner /> component.
 */
const lightColor = {
  /**
   * The palette is available to use, but prefer using the name.
   */
  palette,
  /**
   * A helper for making something see-thru. Use sparingly as many layers of transparency
   * can cause older Android devices to slow down due to the excessive compositing required
   * by their under-powered GPUs.
   */
  transparent: 'rgba(0, 0, 0, 0)',

  white: '#FFFFFF',

  black: '#000000',

  backdrop: 'rgba(255, 255, 255, 0.3)',
  /**
   * the main tinting color
   */
  primaryColor: palette.bleuDeFrance,

  /**
   * The main tinting color, but darker.
   */
  primaryDarker: palette.trueBlue,

  /**
   * The main tinting color, but lighter.
   */
  primaryLighter: palette.aliceBlue,

  // black: palette.blackOpacity,

  danger: palette.ferrariRed,

  // dangerLighter: palette.seashell,

  success: palette.green,

  // successLighter: palette.honeydew,

  // lightYellow: palette.cosmicLatte,

  /**
   * the screens background
   */
  background: palette.white,

  /**
   * alternative screens background
   */
  backgroundAlt: palette.ghostWhite,

  /**
   * default text color, used on light backgrounds
   */
  text: palette.cetaceanBlue,

  onPrimary: palette.white,

  dim: palette.sonicSilver,

  /**
   * used for borders, placeholders and inactive state of icons
   */
  border: palette.lavenderGray,

  /**
   * bacoground of things
   * e.g. `TextInputs`, `badges`, ...
   */
  objectBg: palette.antiFlashWhite,

  /**
   * used in divider lines, to seperate items
   */
  divider: palette.cultured,

  gray: palette.gray5,

  hardGray: palette.gray1,

  warning: palette.orange,

  shadow: '#c0c0c0',

  yellow: palette.yellow,

  /**
   * Storybook background for Text stories, or any stories where
   * the text color is color.text, which is white by default, and does not show
   * in Stories against the default white background
   */
  storybookBg: palette.white,

  /**
   * Storybook text color for stories that display Text components against the
   * white background
   */
  storybookTextColor: palette.black,

  /* used for toast , background color */

  toastError: palette.criticalRed,
};

export const color = lightColor;
