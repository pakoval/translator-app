import { Languages } from "@/languages";

interface IIcon {
  name: string;
  width: string;
  height: string;
}

interface ITranslation {
  id: number;
  inputText: string;
  translation: string;
  targetLang: Languages;
  sourceLang: Languages;
}

export { IIcon, ITranslation };
