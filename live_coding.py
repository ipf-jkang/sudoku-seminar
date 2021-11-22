def is_valid(grid, row, col, n):
  if n in grid[row]: return False
  
  col_nums = [grid[i][col] for i in range(9)]
  if n in col_nums: return False

  box_row_start = (row // 3) * 3
  box_col_start = (col // 3) * 3
  box_nums = [
    grid[r][s]
    for r in range(box_row_start, box_row_start + 3)
    for s in range(box_col_start, box_col_start + 3)
  ]
  if n in box_nums: return False

  return True

def back_track(grid, row, col):
  if row == 9: return True

  if col == 9: return back_track(grid, row + 1, 0)

  if grid[row][col]: return back_track(grid, row, col + 1)

  for n in range(1, 10):
    if is_valid(grid, row, col, n):
      grid[row][col] = n
      if back_track(grid, row, col + 1):
        return True
  
  grid[row][col] = 0
  return False


def solve_sudoku(grid, row, col):
  if row == 9: return grid
  
  if col == 9: return solve_sudoku(grid, row + 1, 0)

  if grid[row][col]: return solve_sudoku(grid, row, col + 1)

  for n in range(1, 10):
    if is_valid(grid, row, col, n):
      grid[row][col] = n
      if back_track(grid, row, col + 1):
        break

  return solve_sudoku(grid, row, col + 1)

grid = [
  [0, 6, 0, 0, 0, 0, 0, 4, 0],
  [0, 9, 0, 1, 7, 0, 0, 0, 0],
  [0, 0, 5, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 3, 0, 5, 0, 0],
  [0, 0, 0, 0, 5, 9, 6, 0, 0],
  [0, 0, 0, 0, 0, 0, 8, 2, 4],
  [8, 0, 2, 5, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 2, 0, 0, 0],
  [4, 0, 0, 0, 0, 8, 0, 0, 6],
]

print(solve_sudoku(grid, 0, 0))