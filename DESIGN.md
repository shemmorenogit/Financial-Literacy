---
name: Warm Acacia Fintech
colors:
  surface: '#fcf9f2'
  surface-dim: '#dcdad3'
  surface-bright: '#fcf9f2'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3ec'
  surface-container: '#f1eee7'
  surface-container-high: '#ebe8e1'
  surface-container-highest: '#e5e2db'
  on-surface: '#1c1c18'
  on-surface-variant: '#414844'
  inverse-surface: '#31312c'
  inverse-on-surface: '#f3f0e9'
  outline: '#717973'
  outline-variant: '#c1c8c2'
  surface-tint: '#3f6653'
  primary: '#012d1d'
  on-primary: '#ffffff'
  primary-container: '#1b4332'
  on-primary-container: '#86af99'
  inverse-primary: '#a5d0b9'
  secondary: '#7e5700'
  on-secondary: '#ffffff'
  secondary-container: '#fdbe50'
  on-secondary-container: '#714d00'
  tertiary: '#302321'
  on-tertiary: '#ffffff'
  tertiary-container: '#473836'
  on-tertiary-container: '#b6a19f'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#c1ecd4'
  primary-fixed-dim: '#a5d0b9'
  on-primary-fixed: '#002114'
  on-primary-fixed-variant: '#274e3d'
  secondary-fixed: '#ffdead'
  secondary-fixed-dim: '#fabc4d'
  on-secondary-fixed: '#281900'
  on-secondary-fixed-variant: '#604100'
  tertiary-fixed: '#f4dddb'
  tertiary-fixed-dim: '#d7c2bf'
  on-tertiary-fixed: '#241917'
  on-tertiary-fixed-variant: '#524341'
  background: '#fcf9f2'
  on-background: '#1c1c18'
  surface-variant: '#e5e2db'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 20px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 18px
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  margin: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system translates the informal, warm, and tactile immediacy of hand-drawn financial literacy wireframes into a structured, approachable mobile-first product. Built specifically for youth financial empowerment, the visual identity replaces institutional intimidation with warmth, clarity, and physical presence.

### Design Movement & Aesthetic
- **Tactile Warmth & Organic Modernism**: Rooted in warm parchment paper backgrounds, solid deep forest acacia headers, and tactile amber interactive affordances.
- **Approachable Pedagogy**: High clarity and gamified directness. Interactive decision cards, step-by-step slider balances, and explicit binary decisions ("Real" vs. "Fake", "Lend it" vs. "Say no") feel grounded and interactive rather than cold or speculative.
- **Tone & Mood**: Trustworthy, welcoming, grounded, encouraging, and unpretentious. Financial concepts feel like relatable everyday life scenarios rather than stressful spreadsheet accounting.

## Colors

The color palette is derived directly from the warm parchment, deep botanical forest canopy, and golden acacia tones of the wireframe.

### Color Roles & Meaning
- **Primary (`#1B4332`)**: Deep Acacia Forest Green. Used for top application app bars, active state fills, hero badges, high-contrast borders, and primary dark text elements. Communicates natural stability, growth, and trust.
- **Secondary (`#E5A93C`)**: Warm Amber Gold. Reserved for primary calls-to-action ("Plan your month", "Start the month", "Next story"), slider thumbs, active confidence scale selections, and interactive milestones.
- **Tertiary (`#FCE5E2`)**: Soft Rose / Blush Pastel. Applied to alert banners, expense notifications, over-budget warnings, and critical decision choices (such as the "Fake" or "Say no" status indicators).
- **Neutral (`#F5F2EB`)**: Warm Parchment Base. The primary canvas backdrop across screens. It reduces eye fatigue, mimics tactile paper, and pairs with an interior card surface tint (`#FAF7EE`).
- **Supportive Accents**: Soft mint tint (`#E8F5E9` / `#D4EDDA`) for positive confirmations, "Real" checks, and savings victories; structured border line (`#2D4A3E` for dominant strokes, `#D3CBBF` for soft interior dividers).

## Typography

Typography uses **Plus Jakarta Sans** uniformly across headlines, body copy, and UI labels. Its friendly geometric curves, generous x-height, and open apertures preserve the informal charisma of hand-lettered wireframe labels while ensuring strict legibility on mobile screens.

### Hierarchy & Treatment
- **Display & Section Headers**: Rendered in Bold (`700`), often placed directly over deep green surfaces in clean white or over warm parchment in deep green (`#1B4332`).
- **Body & Story Prompts**: Set in Regular (`400`) or Medium (`500`) with generous line-heights to support effortless readability during narrative challenges (e.g., scenario prompts like *"A friend asks to borrow KSh 300"*).
- **Labels & Interactive Controls**: Set in Semi-Bold (`600`) to provide instant scannability on buttons, choice tiles, and rating chips.

## Layout & Spacing

The layout is built for compact, focused mobile-first interactions simulating vertical phone viewports, scaling up fluidly into contained single-column or dual-card interfaces on larger viewports.

### Grid & Composition Rules
- **Canvas Rhythm**: Built on a vertical 4px base metric and 8px module. Outer screen boundaries utilize `margin` (16px) on mobile viewports to prioritize touch surface area.
- **Card Padding**: Container cards use `space-md` (16px) or `space-lg` (24px) for scenario intros, keeping options stacked cleanly with `space-sm` (8px) between decision rows.
- **Vertical Flow**: Content follows a structured narrative order:
  1. Sticky or top-anchored forest green header bar.
  2. Scenario context / prompt card.
  3. Interactive input area (sliders, choice stack, or rating scale).
  4. Real-time feedback bar (budget gauge or metric counter).
  5. Primary bottom action button pinned or anchored at the viewport base.

## Elevation & Depth

This system avoids synthetic blurred drop shadows, relying instead on **tactile outlines, stacked tonal layers, and crisp offset press states** that reinforce the wireframe's organic origins.

### Visual Depth Model
- **Level 0 (Parchment Surface)**: Background color `#F5F2EB`. Flat, non-elevated ground plane.
- **Level 1 (Card & Action Containers)**: Surface `#FAF7EE` with a distinct solid 1.5px border (`#2D4A3E` or `#D3CBBF`). No soft drop shadow.
- **Level 2 (Pushed & Interactive Depth)**: High-intent interactive elements (like primary CTA buttons and active scenario pills) use a subtle solid 2px downward line or solid block offset (`box-shadow: 0px 3px 0px #14362A`), providing a mechanical, tactile click sensation when pressed.
- **Level 3 (Modal Dialogs & Sticky Bottom Sheets)**: Framed with a 2px `#1B4332` contour line against a 40% translucent warm green scrim overlay (`rgba(20, 54, 42, 0.4)`).

## Shapes

The design system adopts a roundedness factor of `2` (`0.5rem` / `8px` baseline radius). This delivers friendly, organic card corners that echo hand-drawn boundary contours without compromising professional structure.

### Corner Application
- **Buttons & Main Action Cards**: `0.5rem` (`rounded`) default radius creates friendly, punchy buttons.
- **Large Context Cards & Scenario Boxes**: `1rem` (`rounded-lg`) corner radius, ensuring substantial visual distinction from inner button options.
- **Pills, Rating Circles & Slider Knobs**: Full rounded treatment (`rounded-full` / `9999px`) for confidence ratings (1 to 5) and slider handles.
- **Dashed Insight Cards**: Yellow post-it notes and "Red Flag" insight boxes feature `0.5rem` corners combined with a 1.5px dashed border (`#E5A93C` or `#2D4A3E`).

## Components

### 1. App Header & Title Bar
- Solid `#1B4332` background with `#FFFFFF` or light cream typography.
- Displays centered screen title (e.g., *"Money Moves"*, *"My Money Plan"*, *"Life Happens!"*) paired with a right-aligned hamburger menu toggle (`#FFFFFF`).
- Height fixed at 56px with zero elevation blur, directly bounding the top viewport.

### 2. Buttons & Calls to Action
- **Primary Action (Golden Amber)**: Background `#E5A93C`, text `#1B4332` (or black), 1.5px `#14362A` outline, `rounded-md`, full-width or large centered block. Provides a responsive click down-shift on active state.
- **Secondary / Option Buttons**: Background `#FFFFFF` or `#FAF7EE`, text `#1B4332`, 1.5px outline in `#2D4A3E`. Stacked vertically for decision pathways (*"Lend it"*, *"Say no"*, *"Borrow to lend it"*, *"Fuliza"*, *"Ask the chama"*).
- **Navigation Pagers**: Chevron-indicated horizontal cards (*"Fuliza >"*, *"Chama >"*) with consistent inner padding (`space-md`).

### 3. Sliders & Allocation Gauges
- **Track**: 6px height with `#D3CBBF` unallocated track and `#1B4332` filled track.
- **Thumb**: Circular `#E5A93C` knob (20px diameter) with a crisp 1.5px `#1B4332` border.
- **Progress Gauge (Budget Meter)**: Segmented bar displaying remaining funds (`"Budget left: KSh 1,200"`), with high-contrast forest green indicator and crisp borders.

### 4. Choice & Scenario Cards
- **Binary Choice Tiles ("Real" vs. "Fake")**: Two-column layout. The safe/verified option uses a soft mint background (`#E8F5E9`) with `#1B4332` borders; the alert option uses rose pastel (`#FCE5E2`) with `#1B4332` borders.
- **Scenario Card**: `#FAF7EE` card with rounded corners, framing daily dilemma stories centered in prominent legible typography.

### 5. Confidence Scale & Rating Chips
- **1–5 Rating Row**: Horizontal row of 5 circular buttons (`40px x 40px`).
- **States**: Inactive circles have clear parchment background with `#2D4A3E` borders; active selection is filled in `#E5A93C` with bold text. Labeled at extremes with *"Not sure"* and *"Very sure"*.
- **Before / After Score Cards**: Paired comparison blocks (`Before 2/5`, `After 4/5`) with soft green fill and structured border lines.

### 6. Notice & Hint Callouts
- **Dashed Note Cards**: Warm yellow tint (`#FFF8E7`) with dashed `#D3CBBF` borders to present tips, red flags, or cultural finance definitions (*"What it is"*, *"How it works"*, *"One risk"*).
- **Expense Alert Pill**: Pastel rose background (`#FCE5E2`), 1px outline, used for flags like *"Went over on Transport"*.