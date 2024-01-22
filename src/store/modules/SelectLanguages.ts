import store from "@/store/index";
import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";
import { TLangs } from "@/views/types";
import { Languages } from "@/languages";
import { IChangeLang } from "@/store/types";

@Module({ generateMutationSetters: true })
export class SelectLanguages extends VuexModule {
  selectedLanguages: Record<TLangs, Languages> = {
    targetLang: Languages.EN,
    sourceLang: Languages.UK,
  };
  get selectedLangs() {
    return this.selectedLanguages;
  }

  @Mutation
  swapLanguages() {
    [this.selectedLanguages.targetLang, this.selectedLanguages.sourceLang] = [
      this.selectedLanguages.sourceLang,
      this.selectedLanguages.targetLang,
    ];
  }
  @Mutation
  changeLanguage(payload: IChangeLang) {
    this.selectedLanguages[payload.selectName] = payload.value;
  }
  changeLocalStorage(langs: Record<TLangs, Languages>) {
    localStorage.selectedLangs = JSON.stringify(langs);
  }
  @Action
  public getSelectedLanguages() {
    if (localStorage.selectedLangs) {
      this.selectedLanguages = JSON.parse(localStorage.selectedLangs);
    }
  }
  @Action
  public swapStorageLanguages() {
    this.swapLanguages();
    this.changeLocalStorage(this.selectedLanguages);
  }
  @Action
  public changeStorageLanguages(payload: IChangeLang) {
    this.changeLanguage(payload);
    this.changeLocalStorage(this.selectedLanguages);
  }
}

export const selectLanguagesModule = new SelectLanguages({
  store,
  name: "SelectLanguages",
});
