import { ILanguage } from "@/views/types";

export enum Languages {
  UK = "uk",
  EN = "en",
  JA = "ja",
  BG = "bg",
  GR = "gr",
  PL = "pl",
}
export const langs: ILanguage[] = [
  { language: "Ukrainian", code: Languages.UK },
  { language: "English", code: Languages.EN },
  { language: "Japanese", code: Languages.JA },
  { language: "Bulgarian", code: Languages.BG },
  { language: "Germany", code: Languages.GR },
  { language: "Polish", code: Languages.PL },
];
