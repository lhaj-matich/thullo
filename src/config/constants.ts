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

export const COLORS = [
  {
    name: "blue",
    primary: "#2F80ED",
    secondary: "#D5E6FB",
  },
  {
    name: "green",
    primary: "#219653",
    secondary: "#D3EADD",
  },
  {
    name: "yellow",
    primary: "#F2C94C",
    secondary: "#FCF4DB",
  },
  {
    name: "orange",
    primary: "#F2994A",
    secondary: "#FCE9D9",
  },
  {
    name: "red",
    primary: "#EB5757",
    secondary: "#FBDADA",
  },
  {
    name: "skyblue",
    primary: "#56CCF2",
    secondary: "#D9F3FC",
  },
  {
    name: "lightGreen",
    primary: "#6FCF97",
    secondary: "#E0F5E9",
  },
  {
    name: "purple",
    primary: "#9B51E0",
    secondary: "#EBDCF9",
  },
  {
    name: "cerulean",
    primary: "#007991",
    secondary: "#D6F8FF",
  },
  {
    name: "night",
    primary: "#071108",
    secondary: "#E2F3E4",
  },
  {
    name: "roseRed",
    primary: "#CA2E55",
    secondary: "#F7DEE4",
  },
  {
    name: "sealBrown",
    primary: "#4C1C00",
    secondary: "#FFE5D6",
  },
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
