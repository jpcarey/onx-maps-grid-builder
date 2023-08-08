/** A point is a latitude and longitude coordinate.*/
type Point = {
  lat: number;
  lng: number;
};

/**
 * A grid is a collection of 5 points (latitude and longitude) that
 * form a rectangle.
 */
export type Grid = {
  1: Point;
  2: Point;
  3: Point;
  4: Point;
  5: Point;
};

export type Config = {
  namePrefix: string;
  location: string;
  columns: number;
  rows: number;
  requestToken: string;
};
