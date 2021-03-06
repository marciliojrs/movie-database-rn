import buildUrl from "build-url";
import { API_KEY } from "./local";

const baseUrl = "https://api.themoviedb.org/3/";

export async function callApi(
  endpoint: string,
  options: { [name: string]: string | string[] }
): Promise<any> {
  const url = buildUrl(baseUrl, {
    path: endpoint,
    queryParams: { api_key: API_KEY, ...options }
  });

  return await fetch(url)
    .then((res) => res.json())
    .catch((err) => {
      console.error(err);
    });
}
