import axios from "axios";

const BASE_URL =
  "https://translate.googleapis.com/translate_a/single?client=gtx&sl=";

export async function sendToTranslate(
  source: string,
  target: string,
  text: string
) {
  const url = `${
    BASE_URL + source + "&tl=" + target + "&dt=t&q=" + encodeURI(text)
  }`;
  const { data } = await axios.get(url);
  // data[0] Array with translation elements
  // data[0][0] Exact array with our entered and translated text
  // data[0][0][0] Translated text as string
  return data[0][0][0];
}
