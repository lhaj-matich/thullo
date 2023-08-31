import { COLORS } from "../config/constants";

export const getColor = (name: string) => COLORS[COLORS.findIndex((color) => color.name === name)];
