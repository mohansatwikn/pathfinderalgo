class AStar {
  findPath(grid) {
    const heap = new FlatQueue();
    
    grid.start.distance = 0;
    heap.push(grid.start.id, 0); // push the start cell's id into the heap

    while (heap.length) {
      const currentId = heap.pop(); // take the root node in the heap
      const currentCell = grid.cells[currentId];
      
      if (currentId == grid.end.id) { // Done!
        grid.backTrace(currentCell).forEach(e => grid.cells[e].markAsPath());
        grid.start.markAsStart();
        grid.end.markAsEnd();
        return;
      }
      
      currentCell.markAsVisited();
      const unvisitedNeighbors = grid.getUnvisitedNeighbors(currentCell);

      for (const neighborId of unvisitedNeighbors) {
        const neighborCell = grid.cells[neighborId];
        const neighborDist = currentCell.distance + 1; // distance between the current cell and the current neighbor cell
        neighborCell.markAsQueue();

        // estimated distance from the current cell to the end point
        const heuristic = Math.abs(grid.end.colId - neighborCell.colId) + Math.abs(grid.end.rowId - neighborCell.rowId);

        if (neighborDist < neighborCell.distance) {
          heap.push(neighborId, neighborDist + heuristic); // push the neighbor's id into the heap

          neighborCell.distance = neighborDist; // update the neighbor's distance value
          neighborCell.parent = currentId; // update the neighbor's parent
        }
      }
    }

    grid.start.markAsStart();
    grid.end.markAsEnd();
    return false; // all the cells have been visited and there is no possible way to reach to the end point
  }

  // Calculate the path with animation
  animate() {
    const heap = new FlatQueue();

    grid.start.distance = 0;
    heap.push(grid.start.id, 0); // push the start cell's id into the heap

    function repeat() {
      if (heap.length) {
        const currentId = heap.pop(); // take the root node in the heap
        const currentCell = grid.cells[currentId];

        if (currentId == grid.end.id) { // Done!
          grid.backTrace(currentCell).forEach(e => grid.cells[e].markAsPath());
          grid.start.markAsStart();
          grid.end.markAsEnd();
          return;
        }

        currentCell.markAsVisited();
        const unvisitedNeighbors = grid.getUnvisitedNeighbors(currentCell);

        for (const neighborId of unvisitedNeighbors) {
          const neighborCell = grid.cells[neighborId];
          const neighborDist = currentCell.distance + 1; // distance between the current cell and the current neighbor cell
          neighborCell.markAsQueue();

          // estimated distance from the current cell to the end point
          const heuristic = Math.abs(grid.end.colId - neighborCell.colId) + Math.abs(grid.end.rowId - neighborCell.rowId);

          if (neighborDist < neighborCell.distance) {
            heap.push(neighborId, neighborDist + heuristic); // push the neighbor's id into the heap

            neighborCell.distance = neighborDist; // update the neighbor's distance value
            neighborCell.parent = currentId; // update the neighbor's parent
          }
        }
        requestAnimationFrame(repeat);
      }
    }
    repeat();

    grid.start.markAsStart();
    grid.end.markAsEnd();
    return false; // all the cells have been visited and there is no possible way to reach to the end point
  }
}