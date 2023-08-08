import { Grid } from "./types";

/**
 * Create a timestamp that matches onX's non-standard ISO 8601 string, where
 * the the milliseconds has been removed. For example:
 * Create a Date object and return the ISO string, removing the milliseconds.
 *
 * @example `2023-08-08T00:43:11Z`
 */
export const isoDate = () => new Date().toISOString().split(".")[0] + "Z";

/**
 * Given the original grid item, return a new grid item that has been
 * moved to the right of the original grid item.
 * @param original
 * @returns
 */
const moveRight = (original: Grid) => {
  const move = 0.11068;
  const grid = structuredClone(original);

  // grid[1].lng += move;
  grid[1].lng = limit(grid[1].lng + move);
  grid[2].lng = limit(grid[1].lng + move);
  grid[3].lng = grid[2].lng;
  grid[4].lng = grid[1].lng;
  grid[5].lng = grid[1].lng;
  return grid;
};

/**
 * Given the original grid item, return a new grid item that has been
 * moved down from the original grid item.
 * @param original
 * @returns
 */
const moveDown = (original: Grid) => {
  const move = 0.10319;
  const grid = structuredClone(original);
  grid[1].lat = limit(grid[1].lat - move);
  grid[2].lat = grid[1].lat;
  grid[3].lat = limit(grid[1].lat + move);
  grid[4].lat = grid[3].lat;
  grid[5].lat = grid[1].lat;
  return grid;
};

/**
 * Using the `column` and `row` value, return a new grid item that has been
 * moved to the right and down from the original grid item.
 * @param originalGrid
 * @param column
 * @param row
 * @returns
 */
export const getGrid = (originalGrid: Grid, column: number, row: number) => {
  // clone the original grid so we don't mutate it
  let newGrid = structuredClone(originalGrid);
  // move the grid to the right based on the column value
  for (let i = 0; i < column; i++) {
    newGrid = moveRight(newGrid);
  }
  // move the grid down based on the row value
  for (let i = 0; i < row; i++) {
    newGrid = moveDown(newGrid);
  }
  return newGrid;
};

/**
 * Flatten a Grid object into an array of arrays, the required format
 * for creating the polyline with `@googlemaps/polyline-codec`.
 */
export const flattenGrid = (grid: Grid) => {
  return [
    [grid[1].lat, grid[1].lng],
    [grid[2].lat, grid[2].lng],
    [grid[3].lat, grid[3].lng],
    [grid[4].lat, grid[4].lng],
    [grid[5].lat, grid[5].lng],
  ];
};

/** Reduce the precision of a number to 5 decimal places. */
const limit = (value: number) => Math.round(value * 100000) / 100000;

/**
 * Receives a latitude and longitude location and returns a Grid object that
 * represents a rectangle with the given location as the top left corner.
 *
 * TODO: currently only uses onX's "high" detail level, needs to support
 * "medium" and "low" as well.
 *
 * @param input location in the form of `"43.19403, -116.82069"`
 * @returns `Grid` object
 */
export const convertLocation = (input: string): Grid => {
  const [x, y] = input.replace(" ", "").split(",").map(parseFloat);
  const height = 0.10319;
  const width = 0.11068;
  return {
    1: { lat: limit(x - height), lng: limit(y) }, // start, bottom left
    2: { lat: limit(x - height), lng: limit(y + width) }, // bottom right
    3: { lat: limit(x), lng: limit(y + width) }, // top right
    4: { lat: limit(x), lng: limit(y) }, // top left ***
    5: { lat: limit(x - height), lng: limit(y) }, // end, bottom left
  };
};
