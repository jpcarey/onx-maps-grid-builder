/**
 * onX Hunt API request body to create an offline map.
 */
type OfflineMap = {
  /** onX timestamp, eg. "2023-08-08T00:43:11Z" */
  created_at: string;
  /** onX map detail */
  map_detail: "high";
  /** onX offline map name for UI display, eg. "Map 08/07/23 18:43" */
  name: string;
  /** onX offline map notes, eg. "" */
  notes: string;
  /** Google's encoded polyline, eg. "uisfGhp_hU?wrT}cS??vrT|cS?" */
  polyline: string;
  /** onX region version - not sure what this is for, eg. 0 */
  region_version: number;
  /** onX timstamp, eg. "2023-08-08T00:43:11Z" */
  updated_at: string;
  /** onX UUID, eg. "23e9673f-947a-47eb-8d29-07942132a647" */
  uuid: string;
};

/**
 * Creates a new offline map request for onX.
 *
 * Example request:
 * ``` json
 * {
 *   "created_at": "2023-08-08T00:43:11Z",
 *   "map_detail": "high",
 *   "name": "Map 08/07/23 18:43",
 *   "notes": "",
 *   "polyline": "uisfGhp_hU?wrT}cS??vrT|cS?",
 *   "region_version": 0,
 *   "updated_at": "2023-08-08T00:43:11Z",
 *   "uuid": "23e9673f-947a-47eb-8d29-07942132a647"
 * }
 * ```
 *
 * TODO: Fix the headers, since they were originated from my laptop's browser.
 *
 * @param data The `OfflineMap` object to send to onX.
 */
export const offlineMapRequest = (requestToken: string, data: OfflineMap) =>
  fetch("https://api.production.onxmaps.com/v2/offline_maps", {
    method: "POST",
    headers: {
      authority: "api.production.onxmaps.com",
      accept: "*/*",
      "accept-language": "en-US,en;q=0.9",
      authorization: `Bearer ${requestToken}`,
      "content-type": "application/json",
      "onx-application-id": "hunt",
      "onx-application-platform": "web",
      "onx-application-version": "4.0.0",
      origin: "https://webmap.onxmaps.com",
      referer: "https://webmap.onxmaps.com/",
      "sec-ch-ua":
        '"Not.A/Brand";v="8", "Chromium";v="114", "Microsoft Edge";v="114"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"macOS"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
      "user-agent":
        "user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 Edg/114.0.1823.58",
    },
    body: JSON.stringify(data),
  });
