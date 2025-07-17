# Crazy Golfer - The Ultimate Golf Party Game

Transform any golf experience into an exciting social competition with penalties, challenges.

## What Makes It Special

**🎯 Leader Gets the Challenge**: After each hole, whoever's in the lead faces the penalty wheel - from tricky shot restrictions to hilarious off-course challenges like "drink a beer before the next hole ends."

**🎡 Customizable Penalty Wheel**: Create your own penalties or choose from pre-made sets. Set challenges for just one shot, one hole, or persistent.

**⚖️ Fair Leadership Rules**: When players tie for the lead, a randomizer determines who spins the wheel - keeping it fair and exciting.

## How It Works

1. Set up your group and choose penalty options
2. Play golf normally, tracking strokes after each hole
3. The leader (or tied leaders via randomizer) spins the penalty wheel
4. Penalties add challenge and laughs to every round

## Game Rules & Mechanics

### Leadership Determination

- Leadership is determined after each hole is completed
- The player with the lowest total stroke count leads
- If multiple players tie for the lead, a randomizer wheel determines who spins the penalty wheel

### Penalty Wheel System

- **When**: Spun after each hole by the current leader (or winner of tie-breaker)
- **Duration Types**:
  - **1 Shot**: Applied to either the first shot of the current hole OR must be completed during the current hole
  - **1 Hole**: Applied for the full duration of the current hole (after wheel is spun)
  - **Persistent**: Applied for the rest of the entire game until game ends

### Scoring System

- Simple stroke counting per hole
- Total strokes tracked across all holes
- Players can use final scores however they want after the game

## Technical Implementation

This is a [Next.js](https://nextjs.org) project.

### Development Setup

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Key Features to Implement

- [ ] Penalty wheel with customizable options
- [ ] Scoreboard with live updates
- [ ] Leader determination logic
- [ ] Tie-breaking randomizer
- [ ] Penalty duration tracking
- [ ] Mobile-responsive design for multiple devices
- [ ] Game session management

### Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Real-time**: Socket.io (to be implemented)
- **State Management**: React Context/Jotai (to be determined)
- **Styling**: Tailwind CSS 4 with custom themes
