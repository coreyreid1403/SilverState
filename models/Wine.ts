import { WineColor } from "./WineColor";
import { WineYear } from "./WineYear";

export class Wine {
  name: string;
  color: WineColor;
  years: WineYear[];

  constructor(
    name: string,
    color: WineColor,
    years: WineYear[],
  ) {
    this.name = name;
    this.color = color;
    this.years = years;
  }
}
