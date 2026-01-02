import {
  NgxUiLoaderConfig,
  SPINNER,
  POSITION,
  PB_DIRECTION,
} from 'ngx-ui-loader';

/**
 * NGX-UI-LOADER Configuration
 *
 * Centralized configuration for the global loader
 * Uses project theme colors and settings
 *
 * Customize loader appearance here:
 * - Colors
 * - Spinner types
 * - Progress bar settings
 * - Positions
 * - Animations
 */

// Theme colors from your SCSS variables (_variables.scss)
const THEME_COLOR = '#bc8246'; // $theme-color from your project
const OVERLAY_COLOR = 'rgba(0, 0, 0, 0.7)'; // Dark overlay
const TEXT_COLOR = '#FFFFFF'; // White text

export const loaderConfig: NgxUiLoaderConfig = {
  // Background spinner (small spinner at bottom)
  bgsColor: THEME_COLOR,
  bgsOpacity: 0.5,
  bgsPosition: POSITION.bottomRight,
  bgsSize: 60,
  bgsType: SPINNER.rectangleBounce,

  // Blur effect on overlay
  blur: 5,

  // Delay before showing loader (prevents flash for fast requests)
  // Only show loader if operation takes longer than this delay
  delay: 50, // 500ms - loader only shows if navigation/request takes longer

  // Fast fade out animation
  fastFadeOut: true,

  // Foreground spinner (main spinner in center)
  fgsColor: THEME_COLOR,
  fgsPosition: POSITION.centerCenter,
  fgsSize: 200,
  fgsType: SPINNER.ballScaleMultiple, // Options: ballSpinClockwise, circle, rectangleBounce, etc.

  // Gap between spinner elements
  gap: 24,

  // Logo settings (optional - leave empty if not needed)
  logoPosition: POSITION.centerCenter,
  logoSize: 120,
  logoUrl: '', // Add your logo URL here if needed

  // Master loader ID
  masterLoaderId: 'master',

  // Overlay settings
  overlayBorderRadius: '0',
  overlayColor: OVERLAY_COLOR,

  // Progress bar settings (top loading bar)
  pbColor: THEME_COLOR, // Progress bar color
  pbDirection: PB_DIRECTION.leftToRight, // Direction: leftToRight, rightToLeft
  pbThickness: 3, // Thickness in pixels (3px for slim bar)
  hasProgressBar: true, // Enable/disable progress bar

  // Text settings (optional loading text)
  text: '', // Leave empty for no text, or add custom text like 'Loading...'
  textColor: TEXT_COLOR,
  textPosition: POSITION.centerCenter,

  // Timing
  maxTime: -1, // Maximum time loader can run (-1 for unlimited)
  minTime: 500, // Minimum time to show loader once displayed (prevents flash)
  // If loader appears, it will stay for at least 500ms for smooth UX
};

/**
 * Available Spinner Types:
 *
 * SPINNER.ballSpinClockwise - Spinning balls in circle
 * SPINNER.ballSpinClockwiseFadeRotating - Spinning balls with fade
 * SPINNER.ballSpinFadeRotating - Balls with fade rotation
 * SPINNER.chasingDots - Two dots chasing each other
 * SPINNER.circle - Simple circle spinner
 * SPINNER.cubeGrid - 3x3 cube grid
 * SPINNER.doubleBounce - Two bouncing balls
 * SPINNER.fadingCircle - Fading circle
 * SPINNER.foldingCube - Folding cube animation
 * SPINNER.pulse - Pulsing circle
 * SPINNER.rectangleBounce - Bouncing rectangles (recommended)
 * SPINNER.rotatingPlane - Rotating plane
 * SPINNER.squareJellyBox - Square jelly box
 * SPINNER.threeBounce - Three bouncing balls
 * SPINNER.threeStrings - Three vertical strings
 * SPINNER.wanderingCubes - Wandering cubes
 */

/**
 * Available Positions:
 *
 * POSITION.bottomCenter
 * POSITION.bottomLeft
 * POSITION.bottomRight
 * POSITION.centerCenter
 * POSITION.centerLeft
 * POSITION.centerRight
 * POSITION.topCenter
 * POSITION.topLeft
 * POSITION.topRight
 */
