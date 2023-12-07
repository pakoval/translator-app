import { Languages } from "@/languages";

export interface IPost {
  body: string;
  id: number;
  title: string;
  userId: number;
}

export interface ILanguage {
  language: string;
  code: Languages;
}

export type TLangs = "targetLang" | "sourceLang";
