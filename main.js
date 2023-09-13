// Set the canvas and the grid
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const ratio = 2;
canvas.style.width = window.innerWidth + 'px';
canvas.style.height = window.innerHeight + 'px';
canvas.width = window.innerWidth * ratio;
canvas.height = window.innerHeight * ratio;
ctx.scale(ratio, ratio);

const grid = new Grid(window.innerWidth, window.innerHeight, 15, 1);

// Finders
const finders = [new Djikstra(), new AStar()];

// Is instant find open
let instant = true;

// Current Finder
let currentFinder = 0;