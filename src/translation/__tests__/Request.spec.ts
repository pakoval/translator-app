import axios from "axios";
import { sendToTranslate } from "@/translation/request";

const mockResponse = {
  data: [[["Привіт"]]],
};
jest.mock("axios", () => ({
  get: jest.fn(() => Promise.resolve(mockResponse.data[0][0][0])),
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
    (axios.get as jest.Mock).mockResolvedValue(mockResponse);
    const res = await sendToTranslate(sourceLang, targetLang, "hi");
    expect(mockResponse.data[0][0][0]).toEqual(res);
    expect(axios.get).toHaveBeenCalled();
    expect(axios.get).toHaveBeenCalledWith(url);
  });
  it("called func returns error ", async () => {
    (axios.get as jest.Mock).mockResolvedValue(
      new Error("Cannot read property '0' of undefined")
    );
    try {
      await sendToTranslate(sourceLang, targetLang, "hi");
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
    expect(axios.get).toHaveBeenCalled();
  });
});
