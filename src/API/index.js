class Helper {
  static baseURL() {
    return "https://api.foursquare.com/v2";
  }
  static auth() {
    const keys = {
      client_id: "VMTRPTW1INEDWY1XBEBCGXQMWKT15JJOI22XOX1NX15HOKWV",
      client_secret: "FWESS4RSP43RA1SARGVZFPC0SJRYEG4QSUYKS345CFFF5MFY",
      // client_id: "WNK32CBJWVHO5JF2Y2MXDX01ILURLGOJP0SF0WN2UBOPLHYF",
      // client_secret: "SBGE5YCLSJOGPLV4HZOA51MKGTMN2HGXMPXMO1TIQIZGRLTL",
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
    // let handleErrors = response => {
    //   if (!response.ok) {
    //     alert(
    //       "FourSquare API daily call quota was exceeded. Sorry! Please try again later."
    //     );
    //   }
    //   return response;
    // };

    let requestData = {
      method,
      headers: Helper.headers()
    };
    return (
      fetch(
        `${Helper.baseURL()}${endPoint}?${Helper.auth()}&${Helper.urlBuilder(
          urlParams
        )}`,
        requestData
      )
        // .then(handleErrors)
        .then(res => res.json())
    );
  }
}
export default class SquareAPI {
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
