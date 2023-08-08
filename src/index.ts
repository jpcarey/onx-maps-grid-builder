import "dotenv/config";
import { initConfig } from "./config";
import { createGrid } from "./create_grid";
import { convertLocation } from "./helpers";

const main = async () => {
  // Initialize the configuration from the command line arguments
  const config = initConfig();

  // Create the initial top left rectangle to start the grid
  const initialGrid = convertLocation(config.location);

  // TODO: validate / limit the number of columns and rows

  createGrid({
    grid: initialGrid,
    ...config,
  });
};

main()
  .then(() => {
    console.log("Successfully created all grid items!");
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
