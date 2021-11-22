type Grid = number[][];

class Sudoku {
  grid: Grid;

  constructor(grid: Grid) {
    this.grid = grid;
    const table = document.createElement('table');
    const tbody = document.createElement('tbody');
    for (let i = 0; i < 9; i++) {
      const tr = document.createElement('tr');
      for (let j = 0; j < 9; j++) {
        const td = document.createElement('td');
        td.textContent = `${this.grid[i][j] ? this.grid[i][j] : ''}`;
        tr.appendChild(td);
        td.setAttribute('id', `${i}${j}`);
      }
      tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    document.body.appendChild(table);

    const button = document.createElement('button');
    const onclick = () => {
      this.solveSudoku(0, 0);
    };

    button.onclick = onclick.bind(this);
    button.textContent = '스도쿠 풀기';
    document.body.appendChild(button);
  }

  isValid(row: number, col: number, n: number) {
    if (this.grid[row].includes(n)) {
      return false;
    }

    const colNums = [];
    for (let i = 0; i < 9; i++) {
      colNums.push(this.grid[i][col]);
    }
    if (colNums.includes(n)) {
      return false;
    }

    const boxRowStart = Math.floor(row / 3) * 3;
    const boxColStart = Math.floor(col / 3) * 3;
    const boxNums = [];
    for (let r = boxRowStart; r < boxRowStart + 3; r++) {
      for (let s = boxColStart; s < boxColStart + 3; s++) {
        boxNums.push(this.grid[r][s]);
      }
    }
    if (boxNums.includes(n)) {
      return false;
    }

    return true;
  }

  async backTrack(row: number, col: number): Promise<boolean> {
    if (row === 9) {
      return true;
    }

    if (col === 9) {
      return this.backTrack(row + 1, 0);
    }

    if (this.grid[row][col]) {
      return this.backTrack(row, col + 1);
    }

    for (let i = 1; i < 10; i++) {
      if (this.isValid(row, col, i)) {
        this.grid[row][col] = i;
        (document.getElementById(`${row}${col}`) as any).textContent = `${i}`;
        (
          document.getElementById(`${row}${col}`) as any
        ).style.fontWeight = `500`;

        await this.delay();

        if (await this.backTrack(row, col + 1)) {
          return true;
        }
      }
    }

    this.grid[row][col] = 0;
    (document.getElementById(`${row}${col}`) as any).textContent = '';
    return false;
  }

  async solveSudoku(row: number, col: number): Promise<Grid> {
    if (row === 9) return this.grid;
    if (col === 9) return this.solveSudoku(row + 1, 0);
    if (this.grid[row][col]) return this.solveSudoku(row, col + 1);

    for (let i = 1; i < 10; i++) {
      if (this.isValid(row, col, i)) {
        this.grid[row][col] = i;
        (document.getElementById(`${row}${col}`) as any).textContent = `${i}`;
        (
          document.getElementById(`${row}${col}`) as any
        ).style.fontWeight = `500`;
        await this.delay();

        if (await this.backTrack(row, col + 1)) {
          break;
        }
      }
    }

    return this.solveSudoku(row, col + 1);
  }

  delay() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(1);
      }, 200);
    });
  }
}

const sudoku = new Sudoku([
  [0, 6, 0, 0, 0, 0, 0, 4, 0],
  [0, 9, 0, 1, 7, 0, 0, 0, 0],
  [0, 0, 5, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 3, 0, 5, 0, 0],
  [0, 0, 0, 0, 5, 9, 6, 0, 0],
  [0, 0, 0, 0, 0, 0, 8, 2, 4],
  [8, 0, 2, 5, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 2, 0, 0, 0],
  [4, 0, 0, 0, 0, 8, 0, 0, 6],
]);
