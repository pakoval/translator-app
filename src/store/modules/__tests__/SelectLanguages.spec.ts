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

  it("should update state with default state", () => {
    expect(instance.selectedLanguages).toStrictEqual(langs);
  });
  it("should return selectedLanguages when calling getter selectedLangs", () => {
    const getterLangs: Record<TLangs, Languages> = instance.selectedLangs;
    expect(instance.selectedLanguages).toEqual(getterLangs);
  });
  it("Mutation changeLanguage", () => {
    instance.changeLanguage(payload);
    expect(instance.selectedLanguages.targetLang).toEqual(payload.value);
  });
  it("should mutate the state with swapLanguages", () => {
    const langs: Record<TLangs, Languages> = instance.selectedLangs;
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
    instance.getSelectedLanguages();
    expect(instance.selectedLanguages).toEqual(selectedLangsMock);
  });
  it("should swap langs with action swapStorageLanguages", () => {
    const langsCheck: Record<TLangs, Languages> = {
      targetLang: Languages.UK,
      sourceLang: Languages.EN,
    };
    instance.swapStorageLanguages();
    const selectedLangsMock = JSON.parse(
      localStorage.getItem("selectedLangs") || "{}"
    );
    expect(langsCheck).toEqual(instance.selectedLanguages);
    expect(langsCheck).toEqual(selectedLangsMock);
  });
  it("should change lang with action changeStorageLanguages", () => {
    const langsCheck: Record<TLangs, Languages> = {
      targetLang: Languages.GR,
      sourceLang: Languages.UK,
    };
    instance.changeStorageLanguages(payload);
    expect(langsCheck).toEqual(instance.selectedLanguages);
  });
});
