import type { Board, TileValue, Direction } from "./types";

export function createEmptyBoard(size: number): Board {
  return Array.from({ length: size }, () => Array(size).fill(null));
}

function getEmptyCells(board: Board): [number, number][] {
  const emptyCells: [number, number][] = [];
  board.forEach((row, r) => {
    row.forEach((val, c) => {
      if (val === null) emptyCells.push([r, c]);
    });
  });
  return emptyCells;
}

export function addRandomTile(board: Board): Board {
  const emptyCells = getEmptyCells(board);
  if (emptyCells.length === 0) return board;
  const [r, c] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  const newValue = Math.random() < 0.9 ? 2 : 4;
  const newBoard = board.map(row => row.slice());
  newBoard[r][c] = newValue;
  return newBoard;
}

export function initializeBoard(size: number): Board {
  let board = createEmptyBoard(size);
  board = addRandomTile(board);
  board = addRandomTile(board);
  return board;
}

function slideRowLeft(row: TileValue[]): TileValue[] {
  // Fixed with spread to keep type safety for null[] in result
  return [...row.filter(n => n !== null), ...row.filter(n => n === null)];
}

function mergeRow(row: TileValue[]): [TileValue[], number] {
  const newRow: TileValue[] = [];
  let score = 0;
  for (let i = 0; i < row.length; i++) {
    if (row[i] === null) continue;
    if (row[i] === row[i + 1]) {
      const mergedValue = (row[i] ?? 0) * 2;
      newRow.push(mergedValue);
      score += mergedValue;
      i++; // skip next
    } else {
      newRow.push(row[i]);
    }
  }
  while (newRow.length < row.length) newRow.push(null);
  return [newRow, score];
}

function moveLeft(board: Board): [Board, number, boolean] {
  let score = 0;
  let isMoved = false;

  const newBoard: Board = board.map(row => {
    let compressed = slideRowLeft(row);
    let [merged, gained] = mergeRow(compressed);
    let compressedAfterMerge = slideRowLeft(merged);
    score += gained;
    if (JSON.stringify(row) !== JSON.stringify(compressedAfterMerge)) {
      isMoved = true;
    }
    return compressedAfterMerge;
  });

  return [newBoard, score, isMoved];
}

function rotateBoard(board: Board, times: number): Board {
  let newBoard = board;
  for (let t = 0; t < times; t++) {
    newBoard = newBoard[0].map((_, idx) =>
      newBoard.map(row => row[idx]).reverse()
    );
  }
  return newBoard;
}

export function move(board: Board, direction: Direction): [Board, number, boolean] {
  let rotatedBoard: Board;
  switch (direction) {
    case "left":
      return moveLeft(board);
    case "right":
      rotatedBoard = rotateBoard(board, 2);
      let [movedRightBoard, scoreRight, movedRight] = moveLeft(rotatedBoard);
      return [rotateBoard(movedRightBoard, 2), scoreRight, movedRight];
    case "up":
      rotatedBoard = rotateBoard(board, 3);
      let [movedUpBoard, scoreUp, movedUp] = moveLeft(rotatedBoard);
      return [rotateBoard(movedUpBoard, 1), scoreUp, movedUp];
    case "down":
      rotatedBoard = rotateBoard(board, 1);
      let [movedDownBoard, scoreDown, movedDown] = moveLeft(rotatedBoard);
      return [rotateBoard(movedDownBoard, 3), scoreDown, movedDown];
  }
}

export function checkWin(board: Board): boolean {
  return board.some(row => row.some(val => val === 2048));
}

export function checkGameOver(board: Board): boolean {
  if (getEmptyCells(board).length > 0) return false;

  const size = board.length;
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const current = board[r][c];
      if (
        (c + 1 < size && board[r][c + 1] === current) ||
        (r + 1 < size && board[r + 1][c] === current)
      ) {
        return false;
      }
    }
  }
  return true;
}
