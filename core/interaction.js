let drag = false; // is mouse dragging
let status;

// Mouse events
canvas.addEventListener('mousedown', function (event) {
  drag = true;
  const cell = grid.getCellWithXY(event.x, event.y);
  if (cell) {
    if (cell.wall) status = 0; // Remove walls
    if (!cell.wall) status = 1; // Add walls
    if (cell.start) status = 2; // Update start point
    if (cell.end) status = 3; // Update end point
  }
  update(cell);
});
canvas.addEventListener('mousemove', function (event) {
  if (drag) {
    const cell = grid.getCellWithXY(event.x, event.y);
    if (cell) update(cell);
  }
});
canvas.addEventListener('mouseup', function (event) {
  drag = false;
});

// Touch events (Mobile)
canvas.addEventListener('touchstart', function (event) {
  event.preventDefault();
  const touches = event.changedTouches;
  for (const touch of touches) {
    const cell = grid.getCellWithXY(touch.pageX, touch.pageY);
    if (cell) {
      if (cell.wall) status = 0; // Remove walls
      if (!cell.wall) status = 1; // Add walls
      if (cell.start) status = 2; // Update start point
      if (cell.end) status = 3; // Update end point
    }
    update(cell);
  }

});
canvas.addEventListener('touchmove', function (event) {
  event.preventDefault();
  const touches = event.changedTouches;
  for (const touch of touches) {
    const idx = touch.identifier;
    if (idx >= 0) {
      const cell = grid.getCellWithXY(touch.pageX, touch.pageY);
      if (cell) update(cell);
    }
  }
});

// Updates the given cell according to "status" variable
function update(cell) {
  // resets the grid for new calculation
  grid.reset();
  // delete the wall
  if (status == 0 && cell.wall) {
    cell.unWall();
  }
  // mark as wall
  else if (status == 1 && !cell.start && !cell.end) {
    cell.markAsWall();
  }
  // update the start point
  else if (status == 2 && !cell.end && !cell.wall) {
    grid.updateStart(cell);
  }
  // update the end point
  else if (status == 3 && !cell.start && !cell.wall) {
    grid.updateEnd(cell);
  }
  // instant calculation
  if(instant) finders[currentFinder].findPath(grid);
}