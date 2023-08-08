import { convertLocation, flattenGrid, getGrid, isoDate } from "./helpers";

// Running all pending timers and switching to real timers using Jest
afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

test("isoDate returns ISO 8601 without milliseconds", () => {
  jest.useFakeTimers().setSystemTime(new Date("2021-01-01T00:00:00.123Z"));
  expect(isoDate()).toBe("2021-01-01T00:00:00Z");
});

test("location (top left) should return a rectanglular grid", () => {
  const grid = convertLocation("43.29722, -116.82069");
  expect(grid).toEqual({
    1: { lat: 43.19403, lng: -116.82069 }, // start, bottom left
    2: { lat: 43.19403, lng: -116.71001 }, // bottom right
    3: { lat: 43.29722, lng: -116.71001 }, // top right
    4: { lat: 43.29722, lng: -116.82069 }, // top left
    5: { lat: 43.19403, lng: -116.82069 }, // end, bottom left
  });
});

test("Grid is returned with a formatted as number[][]", () => {
  const grid = convertLocation("43.29722, -116.82069");
  expect(flattenGrid(grid)).toEqual([
    [43.19403, -116.82069],
    [43.19403, -116.71001],
    [43.29722, -116.71001],
    [43.29722, -116.82069],
    [43.19403, -116.82069],
  ]);
});

test("Test a grid by column and row, and check values", () => {
  const grid = convertLocation("43.29722, -116.82069");
  expect(getGrid(grid, 3, 3)).toEqual({
    1: { lat: 42.88446, lng: -116.48865 },
    2: { lat: 42.88446, lng: -116.37797 },
    3: { lat: 42.98765, lng: -116.37797 },
    4: { lat: 42.98765, lng: -116.48865 },
    5: { lat: 42.88446, lng: -116.48865 },
  });
});
