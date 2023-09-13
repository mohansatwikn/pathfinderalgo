class Grid {
  constructor(canvasWidth, canvasHeight, cellSize, lineWidth) {
    this.lineWidth = lineWidth; // Value of line thickness
    this.cellSize = cellSize; // Widht and Height value of cells
    this.cHeight = canvasHeight; // Height of canvas which the grid will be drawn in
    this.cWidth = canvasWidth; // Width of canvas which the grid will be drawn in

    this.rowNum = Math.floor(this.cHeight/this.cellSize); // Row number in grid (1-based)
    this.colNum = Math.floor(this.cWidth/this.cellSize); // Column number in grid (1-based)
    this.width = this.colNum * this.cellSize; // Grid's width
    this.height = this.rowNum * this.cellSize; // Grid's height
    this.marginLeft = (this.cWidth - this.width) / 2; // Value of margin-left in order to center the grid on page
    this.marginTop = (this.cHeight - this.height) / 2; // Value of margin-top in order to center the grid on page
    
    this.cellNum = this.rowNum * this.colNum; // Total cell number in the grid (1-based)
    this.cells = []; // Stores the cells in the grid

    this.start; // Start cell for path finding
    this.end; // End cell for path finding

    this.createCells();
  }

  createCells() {
    for(let i = 0; i < this.cellNum; i++) {
      const colId = i % this.colNum; // Cell's column id
      const rowId = Math.floor(i / this.colNum); // Cells row id
      const xPos = colId * this.cellSize + this.marginLeft; // Cell's x position on canvas
      const yPos = rowId * this.cellSize + this.marginTop; // Cell's y position on canvas
      
      this.cells.push(new Cell(i, colId, rowId, xPos, yPos, this.cellSize, this.lineWidth)); // Create a new cell and push into the "cells" array
    }
    this.start = this.cells[0];
    this.end = this.cells[1];
    
    this.start.markAsStart();
    this.end.markAsEnd();
  }

  // update the start point
  updateStart(cell) {
    this.start.reset();
    this.start = cell;
    this.start.markAsStart();
  }

  // update the end point
  updateEnd(cell) {
    this.end.reset();
    this.end = cell;
    this.end.markAsEnd();
  }

  // Returns the cell according to given x, y coordinate
  getCellWithXY(x, y) {
    const colId = Math.floor((x - this.marginLeft) / this.cellSize);
    const rowId = Math.floor((y - this.marginTop) / this.cellSize);
    if (colId >= this.colNum || colId < 0) return undefined;
    if (rowId >= this.rowNum || rowId < 0) return undefined;
    
    const id = rowId * this.colNum + colId;
    return this.cells[id];
  }

  // Returns the given cell's unvisited neighbors
  getUnvisitedNeighbors(cell) {
    const n = [];

    const i = cell.id;
    const u = i - this.colNum;
    const d = i + this.colNum;
    const r = i + 1;
    const l = i - 1;

    if (u >= 0) n.push(u);
    if (d < this.cellNum) n.push(d);
    if (r % this.colNum && r < this.cellNum) n.push(r);
    if (i % this.colNum && l >= 0) n.push(l);

    return n.filter(e => this.cells[e].visited ? false : true);
  }

  // Returns the path from given cell to start point with backtracing the cell's parents
  backTrace(cell) {
    const path = [];
    let parent = cell.parent;

    while(parent) {
      path.push(parent);
      parent = this.cells[parent].parent;
    }

    return path;
  }

  // Generate a map using randomly marking a certain percent of cells as walls
  generateMap() {
    const percent = 0.3;
    for (let i = 0; i < this.cellNum * percent; i++) {
      const id = Math.floor(Math.random() * this.cellNum);
      if(id != this.start.id && id != this.end.id) this.cells[id].markAsWall();
    }
  }
  
  // Clear all the walls
  clear() {
    this.cells.forEach(e => {
      if(e.wall) e.unWall();
    });
  }

  // Resets the grid for new calculation
  reset() {
    this.cells.forEach(e => {
      if (!e.start && !e.end && !e.wall) e.reset();
    });
    this.updateEnd(this.end);
    this.updateStart(this.start);
  }
}