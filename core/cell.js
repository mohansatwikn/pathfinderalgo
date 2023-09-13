class Cell {
  constructor(id, colId, rowId, x, y, size, lineWidth) {
    this.id = id; // cell's id
    this.colId = colId; // cell's column order in grid (0-base)
    this.rowId = rowId; // cell's row order in grid (0-base)
    this.x = x; // cell's x position on canvas
    this.y = y; // cell's y position on canvas
    this.size = size; // cell's size (width and height)
    this.lineWidth = lineWidth; // cell's border line width
    this.innerX = this.x + this.lineWidth / 2; // cell's inner x coordinate for highliting cell
    this.innerY = this.y + this.lineWidth / 2; // cell's inner y coordinate for highliting cell
    this.innerSize = this.size - this.lineWidth; // cell's inner size for highliting cell

    this.wall = false; // is this cell a wall
    this.start = false; // is this cell start point
    this.end = false; // is this cell end point
    
    this.visited = false; // does this cell visited before
    this.distance = Infinity; // what is the distance between the start point and this cell (or f-score in aStar)
    this.parent = null; // cell's parent to find the path to start point

    this.drawBorders();
  }

  drawBorders() {
    ctx.lineWidth = this.lineWidth;
    ctx.strokeRect(this.x, this.y, this.size, this.size);
  }

  markAsWall() {
    this.wall = true;
    this.visited = true;
    ctx.fillStyle = 'black';
    ctx.fillRect(this.innerX, this.innerY, this.innerSize, this.innerSize);
  }
  unWall() {
    this.wall = false;
    this.visited = false;
    ctx.fillStyle = 'white';
    ctx.fillRect(this.innerX, this.innerY, this.innerSize, this.innerSize);
  }
  markAsStart() {
    this.start = true;
    ctx.fillStyle = 'green';
    ctx.fillRect(this.innerX, this.innerY, this.innerSize, this.innerSize);
  }
  markAsEnd() {
    this.end = true;
    ctx.fillStyle = 'red';
    ctx.fillRect(this.innerX, this.innerY, this.innerSize, this.innerSize);
  }

  markAsPath() {
    ctx.fillStyle = '#F0C701';
    ctx.fillRect(this.innerX, this.innerY, this.innerSize, this.innerSize);
  }
  markAsVisited() {
    this.visited = true;
    ctx.fillStyle = '#99ACCC';
    ctx.fillRect(this.innerX, this.innerY, this.innerSize, this.innerSize);
  }
  markAsQueue() {
    ctx.fillStyle = '#BCF285';
    ctx.fillRect(this.innerX, this.innerY, this.innerSize, this.innerSize);
  }

  reset() {
    this.wall = false;
    this.start = false;
    this.end = false;
    this.visited = false;
    this.distance = Infinity;
    this.parent = null;
    ctx.fillStyle = 'white';
    ctx.fillRect(this.innerX, this.innerY, this.innerSize, this.innerSize);
  }
}