# 2048: ICE EDITION

A responsive, configurable web-based implementation of the classic 2048 game with smooth ice-themed UI. Built using React and TypeScript.

---

## Features

- Play the classic 2048 game on a configurable grid (4x4 to 8x8)
- Clean, modern UI with ice-themed visuals and mobile responsiveness
- Keyboard and button controls for moves
- Dynamic board size selection
- Score and best score tracking (local storage)
- Restart and win/lose modal
- Modular, maintainable codebase

---

## Installation

1. **Clone the repository:**
git clone https://github.com/harithaa-srii/2048-game.git


2. **Install dependencies:**
npm install


3. **Start development server:**
npm run dev


4. **Build for production:**
npm run build


---

## Running the Game

- Visit `http://localhost:5173` (or your Vite port) in your browser after starting the dev server.
- Select your preferred board size (between 4x4 and 8x8) using the input field at the top.
- Start playing with the arrow keys or on-screen control buttons.
- When the game ends (lose or win), a modal will provide feedback and let you restart.

---

## Gameplay Instructions

- **Objective:** Merge tiles with the same number to reach 2048.
- **Controls:**
- **Arrow keys** or **UI buttons** to shift tiles in any direction.
- Tiles merge when they are the same and adjacent, summing their value.
- After every successful move, a new tile (2 or 4) appears at a random empty spot.
- **Win:** Reach the 2048 tile.
- **Lose:** No more moves left (board is filled and no merges possible).
- **Restart:** Click "Restart" or interact with the modal after a win/lose.

---

## Implementation Details

- **Tech Stack:** React, TypeScript, Vite, Tailwind/CSS.
- **Functional Programming:** All board updates (`move`, `merge`, `new tile`) handled by pure functions.
- **State Management:** Uses React state hooks for all game state, score, best score, and modal display.
- **Responsiveness:** Grid and UI adapt automatically to the selected board size and screen dimensions.
- **Code Modularity:** All UI and logic split across dedicated components. CSS classes used for clean presentation.
- **Configurable board size:** Users can select any grid from 4x4 up to 8x8 before or during runtime.

---

## Folder Structure (example)
.
├── dist/
├── node_modules/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── ControlPanel.tsx
│   │   ├── GameBoard.tsx
│   │   ├── Modal.tsx
│   │   ├── ScorePanel.tsx
│   │   └── Tile.tsx
│   ├── logic/
│   │   ├── gameLogic.ts
│   │   └── types.ts
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts


---

## Deployment

- For Vercel, Netlify, or GitHub Pages, use the built `/dist` folder.
- See your deployment platform's docs for static site deployment from Vite.

---

## Contributing

Feel free to fork, open issues, or submit pull requests for improvements and new features!

---

## License

MIT
