export const RANDOM_IMAGES = [
  "fIq0tET6llw",
  "l3N9Q27zULw",
  "sf_1ZDA1YFw",
  "UBhpOIHnazM",
  "G85VuTpw6jg",
  "7Z03R1wOdmI",
  "cNGUw-CEsp0",
  "5E5N49RWtbA",
  "ukzHlkoz1IE",
  "Hyu76loQLdk",
  "fbAnIjhrOL4",
  "NkQD-RHhbvY",
];

export const REACT_APP_API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;
export const REACT_UNSPLASH_ENDPOINT = "https://api.unsplash.com/";

export interface unsplashImage {
  id: string;
  height: number;
}

export interface unsplashImageResponse {
  total: number;
  total_pages: number;
  results: unsplashImage[];
}
