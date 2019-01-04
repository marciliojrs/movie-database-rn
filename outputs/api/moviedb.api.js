import { API_KEY } from "../local";
import buildUrl from "build-url";
const baseUrl = "https://api.themoviedb.org/3/";
export async function callApi(endpoint, options) {
    const url = buildUrl(baseUrl, {
        path: endpoint,
        queryParams: Object.assign({ api_key: API_KEY }, options)
    });
    return await fetch(url).then(res => res.json());
}
//# sourceMappingURL=moviedb.api.js.map