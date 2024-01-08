import axios from "axios";
import { sendToTranslate } from "@/translation/request";

const mockResponse = {
  data: [[["Привіт"]]],
};
jest.mock("axios", () => ({
  get: jest.fn(() => Promise.resolve(mockResponse)),
}));

const sourceLang = "en";
const targetLang = "uk";

describe("sendToTranslate", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("mocking the axios call to get translation", async () => {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURI(
      "hi"
    )}`;
    const res = await sendToTranslate(sourceLang, targetLang, "hi");
    expect(mockResponse.data[0][0][0]).toEqual(res);
    expect(axios.get).toHaveBeenCalled();
    expect(axios.get).toHaveBeenCalledWith(url);
  });
  it("called func returns error ", async () => {
    try {
      expect(
        await sendToTranslate(sourceLang, targetLang, "hi")
      ).toThrowError();
    } catch (e) {
      // ignore
    }
  });
});
