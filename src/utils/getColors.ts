import { COLORS } from "../config/constants";

export const getColor = (name: string) => COLORS.filter((color) => color.name === name);
