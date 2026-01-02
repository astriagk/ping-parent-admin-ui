# NGX-UI-LOADER - Usage Guide

## Overview

The project now uses **ngx-ui-loader** - a feature-rich, professional loading library that provides:
- ✅ Automatic loading for HTTP requests
- ✅ Automatic loading for route navigation
- ✅ Top progress bar (YouTube/LinkedIn style)
- ✅ Customizable spinners (20+ types)
- ✅ Manual control when needed
- ✅ Multiple loader instances
- ✅ Background tasks support

## Configuration Location

**All loader settings are centralized in:** `src/app/shared/config/loader.config.ts`

This file contains:
- Theme colors (uses your project's `$theme-color: #bc8246`)
- Spinner types
- Progress bar settings
- Positions
- Animation settings
- All customization options

## Current Configuration

```typescript
// Located in: src/app/shared/config/loader.config.ts

const THEME_COLOR = '#bc8246'; // Your project theme color
const OVERLAY_COLOR = 'rgba(0, 0, 0, 0.7)';
const TEXT_COLOR = '#FFFFFF';

export const loaderConfig: NgxUiLoaderConfig = {
  // Progress bar at top (3px slim bar)
  hasProgressBar: true,
  pbColor: THEME_COLOR,
  pbThickness: 3,
  pbDirection: PB_DIRECTION.leftToRight,

  // Main spinner in center
  fgsType: SPINNER.ballSpinClockwise,
  fgsColor: THEME_COLOR,
  fgsSize: 60,

  // Background spinner (bottom right)
  bgsType: SPINNER.rectangleBounce,
  bgsColor: THEME_COLOR,

  // ... more settings
};
```

## How It Works

### 1. Automatic Loading (No Code Needed)

**HTTP Requests:**
```typescript
// Loader automatically shows and hides
this.http.get('/api/users').subscribe(data => {
  // Your code
});
```

**Route Navigation:**
```typescript
// Loader automatically shows during navigation
this.router.navigate(['/admin/users']);
```

### 2. Manual Control via LoaderService

```typescript
import { LoaderService } from '@shared/services/loader.service';

constructor(private loaderService: LoaderService) {}

// Show loader
this.loaderService.show();

// Hide loader
this.loaderService.hide();

// Force hide (emergency)
this.loaderService.forceHide();
```

### 3. Advanced Manual Control (Direct ngx-ui-loader)

```typescript
import { NgxUiLoaderService } from 'ngx-ui-loader';

constructor(private ngxLoader: NgxUiLoaderService) {}

// Start/stop main loader
this.ngxLoader.start();
this.ngxLoader.stop();

// Start/stop specific loader by ID
this.ngxLoader.startLoader('my-custom-loader');
this.ngxLoader.stopLoader('my-custom-loader');

// Background tasks (doesn't block UI)
this.ngxLoader.startBackground('upload-task');
this.ngxLoader.stopBackground('upload-task');
```

## Customization Guide

### Change Colors

Edit `src/app/shared/config/loader.config.ts`:

```typescript
const THEME_COLOR = '#your-color'; // Change this
const OVERLAY_COLOR = 'rgba(0, 0, 0, 0.5)'; // Lighter overlay
```

### Change Spinner Type

20+ spinner types available! Edit in config file:

```typescript
fgsType: SPINNER.ballSpinClockwise, // Current

// Available options:
SPINNER.ballSpinClockwise
SPINNER.chasingDots
SPINNER.circle
SPINNER.cubeGrid
SPINNER.doubleBounce
SPINNER.fadingCircle
SPINNER.foldingCube
SPINNER.pulse
SPINNER.rectangleBounce // Recommended
SPINNER.rotatingPlane
SPINNER.squareJellyBox
SPINNER.threeBounce
SPINNER.wanderingCubes
// ... and more!
```

### Change Progress Bar

```typescript
hasProgressBar: true, // Enable/disable
pbThickness: 3, // Thickness in pixels (3 = slim, 5 = medium, 8 = thick)
pbColor: THEME_COLOR, // Color
pbDirection: PB_DIRECTION.leftToRight, // or rightToLeft
```

### Change Position

```typescript
fgsPosition: POSITION.centerCenter, // Main spinner position

// Available positions:
POSITION.bottomCenter
POSITION.bottomLeft
POSITION.bottomRight
POSITION.centerCenter // Recommended for main spinner
POSITION.centerLeft
POSITION.centerRight
POSITION.topCenter
POSITION.topLeft
POSITION.topRight
```

### Add Loading Text

```typescript
text: 'Loading...', // Show text
textColor: '#FFFFFF',
textPosition: POSITION.centerCenter,
```

### Add Logo

```typescript
logoUrl: '/assets/images/logo.png', // Your logo path
logoSize: 120,
logoPosition: POSITION.centerCenter,
```

### Disable Overlay

```typescript
overlayColor: 'rgba(0, 0, 0, 0)', // Transparent = no overlay
```

### Adjust Timing (Smart Loading)

```typescript
delay: 500, // Wait 500ms before showing loader
            // Fast operations won't trigger loader at all!

minTime: 500, // Once shown, keep visible for min 500ms
              // Prevents flash if operation completes too quickly

fastFadeOut: true, // Quick fade out animation
```

**Why this matters:**
- `delay: 500` means fast navigations (< 500ms) won't show loader
- `minTime: 500` means if loader appears, it stays long enough to be noticed (smooth UX)
- Prevents annoying flashes for quick operations

**Adjust these values:**
- Lower `delay` (e.g., 200ms) = loader appears sooner
- Higher `delay` (e.g., 800ms) = loader only for slow operations
- Lower `minTime` (e.g., 300ms) = loader disappears faster
- Higher `minTime` (e.g., 800ms) = loader stays longer for consistency

## Skip Loader for Specific Requests

```typescript
// Add custom header to skip loader
this.http.get('/api/data', {
  headers: { 'X-Skip-Loader': 'true' }
});
```

## Component-Level Loading

For component-specific loading (like tables), continue using local state:

```typescript
// Keep using component-level loading for tables
<app-generic-table
  [loading]="!!(loading$ | async)"
  [items]="items"
>
</app-generic-table>
```

The global loader is best for:
- Page navigation
- Full-page API calls
- Global operations

Use component-level loading for:
- Partial UI updates
- Table data loading
- Section-specific loading

## Multiple Loaders

You can have multiple independent loaders:

```typescript
// Start different loaders for different tasks
this.ngxLoader.startLoader('upload-loader');
this.ngxLoader.startLoader('download-loader');

// Stop them independently
this.ngxLoader.stopLoader('upload-loader');
this.ngxLoader.stopLoader('download-loader');
```

## Files Modified

**Created:**
- ✅ `src/app/shared/config/loader.config.ts` - Centralized configuration

**Modified:**
- ✅ `src/app/app.module.ts` - Imported NgxUiLoaderModule
- ✅ `src/app/app.component.ts` - Route navigation tracking
- ✅ `src/app/app.component.html` - Added ngx-ui-loader component
- ✅ `src/app/shared/services/loader.service.ts` - Wrapper for ngx-ui-loader
- ✅ `src/app/shared/interceptors/loader.interceptor.ts` - HTTP interceptor
- ✅ `src/app/shared/shared.module.ts` - Removed old loader component
- ✅ `package.json` - Added ngx-ui-loader dependency

**Removed:**
- ❌ Old custom loader component (no longer needed)

## Benefits Over Custom Loader

1. ✅ **20+ Pre-built Spinner Types** - Professional animations
2. ✅ **Progress Bar Built-in** - Top loading bar like YouTube
3. ✅ **Better Performance** - Optimized library
4. ✅ **More Features** - Background tasks, multiple loaders, etc.
5. ✅ **Active Maintenance** - Regular updates and bug fixes
6. ✅ **Well Documented** - Large community support
7. ✅ **Centralized Config** - Easy to customize in one place

## Quick Reference

```typescript
// Show loader
loaderService.show();

// Hide loader
loaderService.hide();

// Skip loader for request
headers: { 'X-Skip-Loader': 'true' }

// Customize everything
Edit: src/app/shared/config/loader.config.ts
```

## Testing

The loader is fully integrated and will automatically work with:
- ✅ All HTTP requests via HttpClient
- ✅ All route navigations
- ✅ Manual LoaderService calls

## Learn More

Official Documentation: https://www.npmjs.com/package/ngx-ui-loader

## Implementation Summary

### Files Created

| File | Purpose |
|------|---------|
| `src/app/shared/config/loader.config.ts` | **Centralized configuration** - All loader settings |
| `docs/AI/ngx-ui-loader-usage.md` | This complete usage guide |

### Files Modified

| File | Changes Made |
|------|--------------|
| `src/app/app.module.ts` | • Imported NgxUiLoaderModule<br>• Imported loader configuration |
| `src/app/app.component.ts` | • Imported NgxUiLoaderService<br>• Added route navigation tracking |
| `src/app/app.component.html` | • Added `<ngx-ui-loader></ngx-ui-loader>` component |
| `src/app/shared/services/loader.service.ts` | • Updated to use NgxUiLoaderService<br>• Added advanced methods |
| `src/app/shared/interceptors/loader.interceptor.ts` | • Updated to use NgxUiLoaderService<br>• Added skip-loader support |
| `src/app/shared/shared.module.ts` | • Removed old LoaderComponent |
| `src/app/admin/admin-list/admin-list.component.ts` | • LoaderService injected (ready to use) |
| `package.json` | • Added ngx-ui-loader dependency |

### Current Configuration

```typescript
Theme Color: #bc8246 (your project theme from _variables.scss)
Progress Bar: 3px slim bar at top (YouTube style)
Spinner Type: ballScaleMultiple (center, 200px size)
Background Spinner: rectangleBounce (bottom right, 60px size)
Overlay: Dark with blur effect
Delay: 500ms (only shows if request/navigation takes longer)
Min Display Time: 500ms (prevents flash once shown)
```

### Smart Loading Behavior

The loader uses **intelligent timing** to avoid showing for fast operations:

- **Delay: 500ms** - Loader only appears if navigation/request takes longer than 500ms
- **Min Time: 500ms** - Once shown, loader stays visible for at least 500ms (smooth UX)

**Result:** Fast navigations (< 500ms) won't show the loader at all! This prevents annoying flashes for quick page transitions.

## Troubleshooting

**Loader not showing:**
1. Check browser console for errors
2. Verify NgxUiLoaderModule is imported in app.module
3. Verify `<ngx-ui-loader></ngx-ui-loader>` is in app.component.html
4. Check that loaderConfig is imported correctly

**Loader stuck:**
1. Use `loaderService.forceHide()` to reset
2. Check for unhandled HTTP errors
3. Verify all `show()` calls have corresponding `hide()` calls
4. Check browser network tab for pending requests

**Want to change appearance:**
1. Edit `src/app/shared/config/loader.config.ts`
2. Change spinner type, colors, or position
3. Save the file (hot reload will apply changes)
4. If changes don't appear, restart dev server

**Loader showing too fast/flickering:**
- Increase `delay` in config (currently 500ms)
- This delays showing the loader, preventing flash for fast requests
- Example: `delay: 800` means loader only shows if operation takes > 800ms

**Loader showing for very fast navigations:**
- Current `delay: 500` means loader only shows if navigation takes > 500ms
- Increase `delay` to 800 or 1000 to show even less frequently
- This is by design to prevent annoying flashes

**Want different color:**
- Edit `THEME_COLOR` constant in `loader.config.ts`
- Must match your theme or use any hex color

**Loader disappears too quickly:**
- Increase `minTime` in config (currently 500ms)
- This keeps loader visible longer once it appears
- Ensures users actually see the loading state
