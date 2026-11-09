# Project Directory & Module Architecture Guide

## Overview
Peak Media V4 is a responsive, client-side progressive web application for cinema discovery, curation, and decision making.

## Root Directories
- `index.html` - Primary single-page HTML layout containing portal gateways, stages, modals, and SVG icon symbol sheets.
- `manifest.json` - PWA manifest and web app configuration.
- `sw.js` - Service worker handling caching, Cache-First image delivery, and offline resilience.
- `start-server.bat` - Local HTTP server launcher.
- `css/` - Consolidated stylesheets:
  - `css/base.css` - Custom design system tokens, typography, glassmorphism, animations, portal marks, onboarding views, and motion physics.
  - `css/widgets.css` - Interactive UI widgets, decider tool stages, sliders, and audio visualizer styling.
  - `css/responsive.css` - Mobile, tablet, desktop responsive adjustments and touch layout overrides.
- `js/` - Modular JavaScript architecture:
  - `js/data.js` - Catalog databases, movies, TV shows, genres, tags, matchmaker algorithms, verified poster library, and storage keys.
  - `js/songs-data.js` - Vinyl disc audio catalog and song tracks.
  - `js/main.js` - Core application bootstrapper, shelves rendering, search, filters, modals, IndexedDB poster cache, and profile handlers.
  - `js/ui.js` - Navigation controls, tab routing, header/brand plate, toasts, celestial starfield sync, and UI interactions.
  - `js/motion.js` - Kinetic transitions, tab swap animations, radial staggered menus, and gesture handling.
  - `js/mood_dial.js` - Interactive Cinema Mood Dial wheel, svg sector math, intensity tuning, and spin physics.
  - `js/hub-duel.js` - Watch Duel tournament brackets, face-off animations, and voting logic.
  - `js/features.js` - Deciders toolset: Time Machine, Mood Ricochet pinball lab, and Opposite Day contrarian engine.
  - `js/marathon.js` - Marathon Architect scheduling and timeline pacing.
  - `js/universes.js` - Cinematic universes and franchise exploration matrices.
  - `js/pwa.js` - PWA update notifications, install prompts, and lifecycle handlers.
- `icons/` - PWA icons and app launcher graphics.
