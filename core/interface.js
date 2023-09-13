const panel = document.getElementsByClassName('panel')[0];

// Toggle the panel
document.getElementById('toggle').addEventListener('click', e => panel.classList.toggle('close'));
// Generate map
document.getElementById('generateMap').addEventListener('click', e => grid.generateMap());
// Clear map
document.getElementById('clearMap').addEventListener('click', e => grid.clear());
// Instant claculate
document.getElementById('calcInstant').addEventListener('click', e => {
  grid.reset();
  finders[currentFinder].findPath(grid)
});
// Animete
document.getElementById('calcAnimate').addEventListener('click', e => {
  grid.reset();
  finders[currentFinder].animate(grid)
});
// Instant calculation
document.getElementById('instant').addEventListener('change', e => instant = instant ? false : true);
// Finders selection
document.querySelectorAll('input[name="algorithm"]').forEach(e => {
  e.addEventListener('change', i => currentFinder = +i.target.value);
});