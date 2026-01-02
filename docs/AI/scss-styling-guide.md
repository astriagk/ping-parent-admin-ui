# SCSS Styling Guide - Ping Parent Admin UI

## Overview
This document provides a comprehensive guide for creating new components and pages using the established SCSS structure and design patterns from the Ping Parent Admin UI application.

## Table of Contents
1. [SCSS Architecture](#scss-architecture)
2. [Design System](#design-system)
3. [Component Styling Patterns](#component-styling-patterns)
4. [Creating New Components](#creating-new-components)
5. [Responsive Design](#responsive-design)
6. [Best Practices](#best-practices)

---

## SCSS Architecture

### File Structure
```
src/assets/scss/
├── main.scss                   # Main entry point (imports all partials)
├── _variables.scss             # Color, font, breakpoint variables
├── _mixins.scss                # Reusable SCSS mixins
├── _common.scss                # Common/global styles
├── _spacing.scss               # Spacing utility classes
├── _header.scss                # Header component styles
├── _footer.scss                # Footer component styles
├── _login.scss                 # Login page styles
├── _profile.scss               # Profile page styles
├── _error.scss                 # Error page styles
├── _toaster.scss               # Toast notification styles
├── _mobile-menu.scss           # Mobile menu styles
├── _banner.scss                # Banner section styles
├── _blog.scss                  # Blog section styles
├── _client.scss                # Client section styles
├── _compare.scss               # Compare section styles
├── _contact.scss               # Contact section styles
├── _shop.scss                  # Shop section styles
├── _slider.scss                # Slider section styles
├── _subscribe.scss             # Subscribe section styles
├── _testimonial.scss           # Testimonial section styles
└── _video-modal.scss           # Video modal styles
```

### Import Structure
**File**: [src/assets/scss/main.scss](../../src/assets/scss/main.scss)

All SCSS partials are imported in main.scss:
```scss
@use 'spacing';
@use 'variables';
@use 'mixins';
@use 'common';
@use 'header';
// ... other imports
```

**Important**: When creating a new SCSS partial, it MUST be imported in main.scss to be included in the build.

---

## Design System

### Color Palette
**File**: [src/assets/scss/_variables.scss](../../src/assets/scss/_variables.scss)

#### Primary Colors
```scss
$white: #ffffff;
$black: #201f1f;
$black-2: #323232;
$black-3: #222222;

$theme-color: #bc8246;        // Primary brand color (brown/gold)
$theme-2-color: #8a8f6a;      // Secondary theme color (olive green)
```

#### Background Colors
```scss
$grey: #f5f5f5;
$grey-2: #e1e1e1;
$grey-3: #9d9d9d;
$grey-4: #6666;
$footer-bg: #151616;
```

#### Text Colors
```scss
$heading-color: #201f1f;
$body-text-color: #848b8a;
$black-soft: #444;
$black-soft-2: #606060;
$black-soft-3: #757575;
```

#### Border Colors
```scss
$border: #ebebeb;
$border-2: #383838;
```

#### Color Usage Classes
```scss
.grey-bg { background: $grey; }
.theme-bg { background: $theme-color; }
.white-bg { background: $white; }
.black-bg { background: $black; }
.footer-bg { background: $footer-bg; }

.white-color { color: $white; }
.theme-color { color: $theme-color !important; }
.black-color { color: $black; }
```

### Typography

#### Font Family
```scss
$pop: 'Poppins', sans-serif;
```

#### Heading Sizes
```scss
h1 { font-size: 40px; }
h2 { font-size: 36px; }
h3 { font-size: 27px; }
h4 { font-size: 20px; }
h5 { font-size: 16px; }
h6 { font-size: 14px; }
```

#### Body Text
```scss
body {
  font-family: $pop;
  font-size: 14px;
  font-weight: normal;
  color: $body-text-color;
  line-height: 24px;
}

p {
  font-family: $pop;
  font-size: 14px;
  font-weight: normal;
  color: $body-text-color;
  margin-bottom: 15px;
  line-height: 24px;
}
```

### Responsive Breakpoints
```scss
$laptop: 'only screen and (min-width: 1200px) and (max-width: 1600px)';
$lg: 'only screen and (min-width: 992px) and (max-width: 1199px)';
$md: 'only screen and (min-width: 768px) and (max-width: 991px)';
$sm: 'only screen and (min-width: 576px) and (max-width: 767px)';
$xs: '(max-width: 575px)';
```

**Usage**:
```scss
.my-component {
  padding: 50px;

  @media #{$lg} {
    padding: 40px;
  }

  @media #{$md} {
    padding: 30px;
  }

  @media #{$sm} {
    padding: 20px;
  }

  @media #{$xs} {
    padding: 15px;
  }
}
```

### Spacing System
**File**: [src/assets/scss/_spacing.scss](../../src/assets/scss/_spacing.scss)

Utility classes for margin and padding (5px increments, 5-200):

```scss
// Margin Top: .mt-5, .mt-10, .mt-15, ... .mt-200
// Margin Bottom: .mb-5, .mb-10, .mb-15, ... .mb-200
// Margin Left: .ml-5, .ml-10, .ml-15, ... .ml-200
// Margin Right: .mr-5, .mr-10, .mr-15, ... .mr-200

// Padding Top: .pt-5, .pt-10, .pt-15, ... .pt-200
// Padding Bottom: .pb-5, .pb-10, .pb-15, ... .pb-200
// Padding Left: .pl-5, .pl-10, .pl-15, ... .pl-200
// Padding Right: .pr-5, .pr-10, .pr-15, ... .pr-200
```

**Example Usage**:
```html
<div class="mt-50 mb-30 pt-20 pb-40">
  <!-- Content -->
</div>
```

---

## Component Styling Patterns

### Mixins
**File**: [src/assets/scss/_mixins.scss](../../src/assets/scss/_mixins.scss)

#### 1. Background Mixin
```scss
@mixin background($position: center, $size: cover, $repeat: no-repeat) {
  background: {
    position: $position;
    repeat: $repeat;
    size: $size;
  }
}
```

**Usage**:
```scss
.hero-section {
  @include background(center, cover, no-repeat);
}
```

#### 2. Transition Mixin
```scss
@mixin transition($time) {
  -webkit-transition: all $time ease-out 0s;
  -moz-transition: all $time ease-out 0s;
  -ms-transition: all $time ease-out 0s;
  -o-transition: all $time ease-out 0s;
  transition: all $time ease-out 0s;
}
```

**Usage**:
```scss
.button {
  @include transition(0.3s);
}
```

#### 3. Transform Mixin
```scss
@mixin transform($transforms) {
  -webkit-transform: $transforms;
  -moz-transform: $transforms;
  -ms-transform: $transforms;
  transform: $transforms;
}
```

#### 4. Border Radius Mixin
```scss
@mixin border-radius($radius) {
  -webkit-border-radius: $radius;
  -moz-border-radius: $radius;
  border-radius: $radius;
}
```

#### 5. Box Shadow Mixin
```scss
@mixin box-shadow($shadow) {
  -webkit-box-shadow: $shadow;
  -moz-box-shadow: $shadow;
  box-shadow: $shadow;
}
```

#### 6. Flexbox Mixin
```scss
@mixin flexbox() {
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
}
```

#### 7. Pseudo-element Position Mixins
```scss
// Before element - left top
@mixin before-left-top($width, $height, $background, $left, $top) { }

// Before element - left bottom
@mixin before-left-bottom($width, $height, $background, $left, $bottom) { }

// Before element - right top
@mixin before-right-top($width, $height, $background, $right, $top) { }

// Before element - right bottom
@mixin before-right-bottom($width, $height, $background, $right, $bottom) { }

// After element - similar variations
@mixin after-left-top($width, $height, $background, $left, $top) { }
// ... and other after variations
```

### Button Styles

#### Primary Button (.os-btn)
```scss
.os-btn {
  display: inline-block;
  text-transform: uppercase;
  text-align: center;
  font-weight: 600;
  height: 50px;
  line-height: 46px;
  padding: 0 42px;
  border: 2px solid $border;
  color: $black-2;
  background: transparent;
  font-size: 12px;

  &:hover {
    color: $white;
    border-color: $theme-color;
    background-color: $theme-color;
  }
}
```

**Variants**:
```scss
.os-btn-black { /* Black background variant */ }
.os-btn-white { /* White border variant */ }
.os-btn-2 { /* Black border variant */ }
.os-btn-3 { /* Extra padding variant */ }
.os-btn-4 { /* Theme-2 color variant */ }
.os-btn-5 { /* White text variant */ }
```

#### Link Button
```scss
.link-btn {
  font-size: 12px;
  color: $black-soft;
  text-transform: capitalize;
  font-weight: 500;

  &:hover {
    color: $theme-color;
  }
}
```

#### Action Button
```scss
.action-btn {
  background: $black;
  color: $white;
  font-size: 14px;
  padding: 15px 31.9px;
  transition: 0.3s;

  &:hover {
    background: $theme-2-color;
    color: $white;
  }
}
```

### Form Input Styles

Reference from [_login.scss](../../src/assets/scss/_login.scss):

```scss
.basic-login {
  padding: 90px;
  border: 2px solid #eaedff;

  @media #{$lg} {
    padding: 50px;
  }

  @media #{$md} {
    padding: 40px;
  }

  @media #{$xs} {
    padding: 30px;
  }

  h3 {
    font-size: 30px;
  }

  input {
    width: 100%;
    height: 60px;
    border: 2px solid #eaedff;
    color: #6f7172;
    padding: 0 20px;

    &::placeholder {
      color: #6f7172;
    }
  }

  label {
    color: #222;
    display: block;

    span {
      color: red; // For required asterisk
    }
  }
}
```

### Common Utility Classes

#### Position
```scss
.p-relative { position: relative; }
.p-absolute { position: absolute; }
.z-index-1 { z-index: 1; }
```

#### Float
```scss
.f-left { float: left; }
.f-right { float: right; }
.clear { clear: both; }
```

#### Text
```scss
.uppercase { text-transform: uppercase; }
.capitalize { text-transform: capitalize; }
```

#### Images
```scss
.w-img img { width: 100%; }
.m-img img { max-width: 100%; }
```

#### Cursor
```scss
.cursor-pointer { cursor: pointer; }
```

---

## Creating New Components

### Step 1: Create Component SCSS File

Create a new partial file in `src/assets/scss/`:
```
_[component-name].scss
```

**Example**: `_admin-dashboard.scss`

### Step 2: Import Variables and Mixins

Start your file with:
```scss
@use "variables" as *;
@use "mixins" as *;

/*----------------------------------------*/
/*  [COMPONENT NAME] CSS
/*----------------------------------------*/
```

### Step 3: Follow BEM Naming Convention

Use Block Element Modifier (BEM) methodology:

```scss
.admin-dashboard {
  padding: 2rem;
  background: $white;

  // Element
  &__header {
    border-bottom: 1px solid $border;
    padding-bottom: 1rem;
    margin-bottom: 2rem;

    // Nested element
    &-title {
      font-size: 24px;
      color: $heading-color;
    }
  }

  // Element
  &__content {
    min-height: 400px;
  }

  // Element
  &__card {
    background: $grey;
    padding: 20px;
    @include border-radius(8px);
    @include box-shadow(0 2px 8px rgba(0, 0, 0, 0.1));

    // Modifier
    &--highlighted {
      border: 2px solid $theme-color;
    }
  }

  // Responsive adjustments
  @media #{$md} {
    padding: 1.5rem;
  }

  @media #{$xs} {
    padding: 1rem;
  }
}
```

### Step 4: Add to main.scss

Import your new partial in [main.scss](../../src/assets/scss/main.scss):

```scss
@use 'admin-dashboard';
```

### Example: Admin Table Component

```scss
@use "variables" as *;
@use "mixins" as *;

/*----------------------------------------*/
/*  ADMIN TABLE CSS
/*----------------------------------------*/

.admin-table {
  background: $white;
  @include border-radius(8px);
  @include box-shadow(0 2px 8px rgba(0, 0, 0, 0.1));
  overflow: hidden;

  &__wrapper {
    padding: 2rem;

    @media #{$md} {
      padding: 1.5rem;
    }

    @media #{$xs} {
      padding: 1rem;
    }
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;

    &-title {
      font-size: 24px;
      color: $heading-color;
      margin-bottom: 0;
    }

    &-actions {
      display: flex;
      gap: 10px;
    }
  }

  table {
    width: 100%;
    border-collapse: collapse;

    thead {
      background-color: #f8f9fa;

      tr th {
        padding: 1rem;
        text-align: left;
        font-weight: 600;
        color: $black-2;
        border-bottom: 2px solid $border;
        font-size: 14px;
        text-transform: uppercase;
      }
    }

    tbody {
      tr {
        border-bottom: 1px solid $border;
        @include transition(0.3s);

        &:hover {
          background-color: #f8f9fa;
        }

        td {
          padding: 1rem;
          color: $body-text-color;
          font-size: 14px;
        }
      }
    }
  }

  &__status {
    &-badge {
      padding: 0.25rem 0.75rem;
      @include border-radius(12px);
      font-size: 0.875rem;
      font-weight: 500;
      display: inline-block;
      text-transform: capitalize;

      &--active {
        background-color: #d4edda;
        color: #155724;
      }

      &--inactive {
        background-color: #f8d7da;
        color: #721c24;
      }

      &--pending {
        background-color: #fff3cd;
        color: #856404;
      }
    }
  }

  &__actions {
    display: flex;
    gap: 10px;

    button {
      padding: 0.5rem 1rem;
      @include border-radius(4px);
      border: none;
      font-size: 0.875rem;
      cursor: pointer;
      @include transition(0.3s);

      &.view-btn {
        background-color: #007bff;
        color: $white;

        &:hover {
          background-color: #0056b3;
        }
      }

      &.edit-btn {
        background-color: $theme-color;
        color: $white;

        &:hover {
          background-color: darken($theme-color, 10%);
        }
      }

      &.delete-btn {
        background-color: #dc3545;
        color: $white;

        &:hover {
          background-color: #c82333;
        }
      }
    }
  }

  &__loading {
    text-align: center;
    padding: 3rem;
    font-size: 1.1rem;
    color: $grey-3;
  }

  &__empty {
    text-align: center;
    padding: 3rem;
    color: $grey-3;

    &-icon {
      font-size: 48px;
      margin-bottom: 1rem;
      color: $grey-2;
    }

    &-text {
      font-size: 16px;
    }
  }
}
```

---

## Responsive Design

### Mobile-First Approach

Always consider mobile responsiveness when creating components:

```scss
.component {
  // Base styles (mobile)
  padding: 15px;
  font-size: 14px;

  // Tablet
  @media #{$sm} {
    padding: 20px;
    font-size: 15px;
  }

  // Medium devices
  @media #{$md} {
    padding: 30px;
    font-size: 16px;
  }

  // Large devices
  @media #{$lg} {
    padding: 40px;
  }

  // Extra large
  @media #{$laptop} {
    padding: 50px;
  }
}
```

### Common Responsive Patterns

#### Hide/Show Elements
```scss
.desktop-only {
  display: block;

  @media #{$md}, #{$sm}, #{$xs} {
    display: none;
  }
}

.mobile-only {
  display: none;

  @media #{$xs} {
    display: block;
  }
}
```

#### Responsive Grid
```scss
.grid-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;

  @media #{$lg} {
    grid-template-columns: repeat(3, 1fr);
  }

  @media #{$md} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media #{$xs} {
    grid-template-columns: 1fr;
  }
}
```

#### Responsive Flexbox
```scss
.flex-container {
  @include flexbox();
  justify-content: space-between;
  align-items: center;

  @media #{$md}, #{$sm}, #{$xs} {
    flex-direction: column;
    align-items: flex-start;
  }
}
```

---

## Best Practices

### 1. Use Variables
Always use defined color and spacing variables:

```scss
// ✅ Good
.card {
  background: $white;
  border: 1px solid $border;
  color: $body-text-color;
}

// ❌ Bad
.card {
  background: #ffffff;
  border: 1px solid #ebebeb;
  color: #848b8a;
}
```

### 2. Use Mixins for Repetitive Patterns
```scss
// ✅ Good
.box {
  @include border-radius(8px);
  @include box-shadow(0 2px 8px rgba(0, 0, 0, 0.1));
  @include transition(0.3s);
}

// ❌ Bad
.box {
  -webkit-border-radius: 8px;
  -moz-border-radius: 8px;
  border-radius: 8px;
  -webkit-box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-out 0s;
}
```

### 3. Follow BEM Naming Convention
```scss
// ✅ Good
.admin-card {
  &__header { }
  &__body { }
  &__footer { }
  &--highlighted { }
}

// ❌ Bad
.adminCard { }
.admin_card { }
.admin-card-header { }
```

### 4. Nest Responsively
```scss
// ✅ Good
.component {
  padding: 50px;

  @media #{$md} {
    padding: 30px;
  }

  @media #{$xs} {
    padding: 15px;
  }
}

// ❌ Bad (separate media queries)
.component {
  padding: 50px;
}

@media #{$md} {
  .component {
    padding: 30px;
  }
}
```

### 5. Use Utility Classes for Spacing
```scss
// ✅ Good (in HTML)
<div class="mt-30 mb-50">Content</div>

// ❌ Bad (creating custom classes for simple spacing)
.my-custom-spacing {
  margin-top: 30px;
  margin-bottom: 50px;
}
```

### 6. Component-Scoped Styles
Keep styles scoped to components:

```scss
// ✅ Good
.admin-list {
  &__table {
    // Styles specific to admin list table
  }
}

// ❌ Bad (global table styles that might affect other components)
table {
  // Styles that affect all tables
}
```

### 7. Consistent Transitions
Use the transition mixin with consistent timing:

```scss
// ✅ Good
.button {
  @include transition(0.3s);
}

.link {
  @include transition(0.3s);
}

// ❌ Bad (inconsistent timings)
.button {
  transition: 0.5s;
}

.link {
  transition: 0.2s;
}
```

---

## Quick Reference Checklist

When creating a new component SCSS file:

- [ ] Create `_[component-name].scss` in `src/assets/scss/`
- [ ] Import variables and mixins at the top
- [ ] Add component header comment
- [ ] Use BEM naming convention
- [ ] Use defined color variables ($theme-color, $white, etc.)
- [ ] Use mixins for transitions, shadows, borders
- [ ] Add responsive breakpoints
- [ ] Test on all breakpoints (xs, sm, md, lg, laptop)
- [ ] Import in `main.scss`
- [ ] Use spacing utility classes where applicable
- [ ] Follow existing patterns from similar components

---

## Component Template

Use this template when creating new component SCSS:

```scss
@use "variables" as *;
@use "mixins" as *;

/*----------------------------------------*/
/*  [COMPONENT NAME] CSS
/*----------------------------------------*/

.component-name {
  // Container styles
  padding: 2rem;
  background: $white;

  // Element
  &__header {
    margin-bottom: 1.5rem;

    &-title {
      font-size: 24px;
      color: $heading-color;
    }
  }

  // Element
  &__content {
    // Content styles
  }

  // Element with modifier
  &__button {
    padding: 0.5rem 1rem;
    background: $theme-color;
    color: $white;
    border: none;
    @include border-radius(4px);
    @include transition(0.3s);

    &:hover {
      background: darken($theme-color, 10%);
    }

    // Modifier
    &--secondary {
      background: $theme-2-color;

      &:hover {
        background: darken($theme-2-color, 10%);
      }
    }
  }

  // Responsive
  @media #{$lg} {
    padding: 1.5rem;
  }

  @media #{$md} {
    padding: 1.25rem;
  }

  @media #{$sm} {
    padding: 1rem;
  }

  @media #{$xs} {
    padding: 0.75rem;
  }
}
```

---

## Related Documentation
- [API Integration Context](./api-integration-context.md)
- [AI Prompt Guide](./ai-prompt-guide.md)
- Admin List Component Reference:
  - [admin-list.component.scss](../../src/app/admin/admin-list/admin-list.component.scss)
  - [admin-list.component.html](../../src/app/admin/admin-list/admin-list.component.html)
