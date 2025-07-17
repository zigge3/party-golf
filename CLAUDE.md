# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 application called "Crazy Golf" - a party game application that enhances golf experiences with penalty wheels, challenges, and social competition mechanics. The app tracks golf scores and applies penalties to the current leader after each hole.

## Key Technologies

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS 4
- **State Management**: Jotai for global state
- **Runtime**: React 19
- **Storage**: localStorage for game persistence

## Development Commands

```bash
# Start development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## Application Architecture

### Core Game Flow
The game follows a state-driven architecture with distinct phases:
1. **Setup Phase**: Player management and game configuration
2. **Score Entry Phase**: Recording hole scores
3. **Leader Penalty Phase**: Penalty wheel for leaders/tie-breakers
4. **Game Complete Phase**: Final results and restart options

### State Management Structure
- **Global Atoms** (`lib/atoms.ts`): Core game state using Jotai
  - `playersAtom`: Player data and scores
  - `gameStateAtom`: Current game phase and hole tracking
  - `penaltiesAtom`: Active penalties and their duration
- **Game Logic** (`lib/gameLogic.ts`): Pure functions for leader determination and game rules
- **Persistence** (`lib/storage.ts`): localStorage integration for game state
- **Theme System** (`lib/theme.ts`): Centralized styling configuration

### Component Organization
- **GameManager**: Main page component orchestrating all game phases
- **PlayerManagement**: Adding/removing players during setup
- **ScoreEntry**: Hole-by-hole score input
- **Scoreboard**: Live score display and rankings
- **PenaltyWheel**: Spinning wheel for penalty selection
- **TieBreaker**: Randomizer for tied leaders
- **ActivePenalties**: Display of current active penalties

### Penalty System
Three penalty types with different durations:
- **Shot**: Applied to a single shot
- **Hole**: Applied for one complete hole
- **Persistent**: Applied for remainder of game

### Key Game Rules
- Leader determination based on lowest total strokes
- Tie-breaking uses randomizer wheel
- Penalties are applied after each hole to current leader(s)
- Game state persists across browser sessions
- Swedish language interface (note: all UI text is in Swedish)

## Import Patterns

Use absolute imports with `@/` prefix:
```typescript
import { playersAtom } from '@/lib/atoms'
import PlayerManagement from '@/components/PlayerManagement'
```

## Styling Approach

The app uses a custom theme system (`lib/theme.ts`) rather than standard Tailwind classes for colors. All styling should reference the theme object for consistency:

```typescript
style={{ backgroundColor: theme.colors.primary[600] }}
```

## TypeScript Configuration

- Strict mode enabled
- Path mapping configured for `@/*` imports
- Next.js plugin integrated for optimizations