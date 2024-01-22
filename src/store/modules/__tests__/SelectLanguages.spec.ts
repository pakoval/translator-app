import Vuex from "vuex";
import { SelectLanguages } from "@/store/modules/SelectLanguages";
import { IChangeLang } from "@/store/types";
import { Languages } from "@/languages";
import { TLangs } from "@/views/types";

jest.spyOn(Object.getPrototypeOf(window.localStorage), "setItem");
jest.spyOn(Object.getPrototypeOf(window.localStorage), "getItem");

describe("SelectLanguages", () => {
  let instance: SelectLanguages;
  let store;
  const payload: IChangeLang = {
    value: Languages.GR,
    selectName: "targetLang",
  };
  const langs: Record<TLangs, Languages> = {
    targetLang: Languages.EN,
    sourceLang: Languages.UK,
  };

  beforeEach(() => {
    store = new Vuex.Store({
      state: {},
    });
    instance = new SelectLanguages({ store, name: "SelectLanguages" });
    jest.clearAllMocks();
  });

  it("should have default state", () => {
    expect(instance.selectedLanguages).toStrictEqual(langs);
  });
  it("should return selectedLanguages when calling getter selectedLangs", () => {
    const getterLangs: Record<TLangs, Languages> = instance.selectedLangs;
    expect(instance.selectedLanguages).toEqual(getterLangs);
  });
  it("should change the targetLang on calling changeLanguage mutation", () => {
    instance.changeLanguage(payload);
    expect(instance.selectedLanguages.targetLang).toEqual(payload.value);
  });
  it("should mutate the state with swapLanguages", () => {
    const langs: Record<TLangs, Languages> = {
      targetLang: Languages.UK,
      sourceLang: Languages.EN,
    };
    instance.swapLanguages();
    expect(instance.selectedLangs).toEqual(langs);
  });
  it("should set selectedLangs in the localStorage", () => {
    localStorage.setItem("selectedLangs", JSON.stringify(langs));
    instance.changeLocalStorage(langs);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "selectedLangs",
      JSON.stringify(langs)
    );
  });
  it("should get selectedLangs from the localStorage", () => {
    const selectedLangsMock = JSON.parse(
      localStorage.getItem("selectedLangs") || "{}"
    );
    expect(instance.selectedLangs).toEqual(selectedLangsMock);
  });
  it("should swap langs with action swapStorageLanguages", () => {
    instance.swapStorageLanguages();
    expect(instance.selectedLangs.targetLang).toEqual(Languages.UK);
    expect(instance.selectedLangs.sourceLang).toEqual(Languages.EN);
  });
  it("should change lang with action changeStorageLanguages", () => {
    const langsCheck: Record<TLangs, Languages> = {
      targetLang: Languages.GR,
      sourceLang: Languages.UK,
    };
    instance.changeStorageLanguages(payload);
    expect(instance.selectedLanguages).toEqual(langsCheck);
  });
  it("should set langs from localStorage to selectedLanguages", () => {
    const selectedLangsMock = JSON.parse(
      localStorage.getItem("selectedLangs") || "{}"
    );
    instance.getSelectedLanguages();
    expect(instance.selectedLangs).toEqual(selectedLangsMock);
  });
});
