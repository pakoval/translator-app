import axios from "axios";
import { sendToTranslate } from "@/translation/request";

const mockResponse = "привіт";

jest.mock("axios", () => ({
  get: jest.fn(() => Promise.resolve(mockResponse)),
}));

const mockedAxios = axios as jest.Mocked<typeof axios>;
const sourceLang = "en";
const targetLang = "uk";

it("mocking the axios call to get translation", async () => {
  mockedAxios.get.mockResolvedValue({
    data: mockResponse,
  });
  const result = await sendToTranslate(sourceLang, targetLang, "hi");
  expect(mockedAxios.get).toHaveBeenCalledTimes(1);
  setTimeout(() => {
    expect(result).toBe(mockResponse);
  }, 0);
});
it("called func returns error ", async () => {
  expect.assertions(1);
  expect(axios.get).toHaveBeenCalledTimes(1);
  setTimeout(() => {
    expect(
      sendToTranslate(sourceLang, targetLang, "hello")
    ).rejects.toThrowError("Cannot read property 'data' of undefined");
  }, 0);
});
