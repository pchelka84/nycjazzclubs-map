class Helper {
  static baseURL() {
    return "https://api.foursquare.com/v2";
  }
  static auth() {
    const keys = {
      client_id: "VMTRPTW1INEDWY1XBEBCGXQMWKT15JJOI22XOX1NX15HOKWV",
      client_secret: "FWESS4RSP43RA1SARGVZFPC0SJRYEG4QSUYKS345CFFF5MFY",
      v: 20181001
    };
    return Object.keys(keys)
      .map(key => `${key}=${keys[key]}`)
      .join("&");
  }
  static urlBuilder(urlParams) {
    if (!urlParams) {
      return "";
    }
    return Object.keys(urlParams)
      .map(key => `${key}=${urlParams[key]}`)
      .join("&");
  }
  static headers() {
    return {
      Accept: "application/json"
    };
  }
  static simpleFetch(endPoint, method, urlParams) {
    let requestData = {
      method,
      headers: Helper.headers()
    };
    return fetch(
      `${Helper.baseURL()}${endPoint}?${Helper.auth()}&${Helper.urlBuilder(
        urlParams
      )}`,
      requestData
    ).then(res => res.json());
    // .then(response => {
    //   if (!response.ok) {
    //     throw Error(response.statusText);
    //   }
    //   return response.json();
    // })
    // .then(response => console.log("ok"))
    // .catch(error => console.log(Error));
  }
}
export default class SquareAPI {
  Error;
  static search(urlParams) {
    return Helper.simpleFetch("/venues/search", "GET", urlParams);
  }
  static getVenueDetails(VENUE_ID) {
    return Helper.simpleFetch(`/venues/${VENUE_ID}`, "GET");
  }
  static getVenuePhotos(VENUE_ID) {
    return Helper.simpleFetch(`/venues/${VENUE_ID}/photos`, "GET");
  }
}
