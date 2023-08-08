import { encode } from "@googlemaps/polyline-codec";
import { randomUUID } from "crypto";
import "dotenv/config";
import { flattenGrid, getGrid, isoDate } from "./helpers";
import { offlineMapRequest } from "./requests";
import { Config, Grid } from "./types";

interface CreateGridParams extends Omit<Config, "location"> {
  grid: Grid;
}

export const createGrid = async ({
  requestToken,
  grid,
  columns,
  rows,
  namePrefix,
}: CreateGridParams) => {
  for (let c = 0; c < columns; c++) {
    for (let r = 0; r < rows; r++) {
      // used for the created_at and updated_at fields
      const timestamp = isoDate();

      // the grid for the current column and row
      const location = getGrid(grid, c, r);

      // the flattened grid required to format for the polyline
      const path = flattenGrid(location);

      // the encoded polyline, using Google's polyline-codec library.
      // https://developers.google.com/maps/documentation/utilities/polylinealgorithm
      const polyline = encode(path, 5);

      // friendly name to display in the onX app for the offline map
      const name = `${namePrefix}: ${c + 1}.${r + 1}`;

      console.log(`c: ${c}, r: ${r}, polyline: ${polyline}`);
      console.log(`path: ${JSON.stringify(path)}`);

      const data = {
        created_at: timestamp,
        map_detail: "high",
        name,
        notes: "",
        polyline,
        region_version: 0,
        updated_at: timestamp,
        uuid: randomUUID(),
      } as const;

      const resp = await offlineMapRequest(requestToken, data);

      if (!resp.ok) {
        const respText = await resp.text();
        const message = `onX offline map request failed: ${resp.status} - ${resp.statusText}, ${respText}`;
        throw new Error(message);
      }

      console.log(`[${name}] ${resp.status} - ${resp.statusText}\n`);
    }
  }
};
