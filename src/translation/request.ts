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

export async function getPhones() {
  const url = "https://dummyjson.com/products/category/smartphones";
  try {
    const { data } = await axios.get(url);
    console.log(data);
  } catch (e) {
    console.log(e);
  }
}

export async function addProduct() {
  const url = "https://dummyjson.com/products/add";
  const product = {
    title: "IPhone 14",
    price: 34435,
  };
  try {
    const { data } = await axios.post(url, product);
    console.log(data);
  } catch (e) {
    console.log(e);
  }
}

export async function deleteProduct(id: number) {
  try {
    const { data } = await axios.delete(`https://dummyjson.com/products/${id}`);
    console.log(data);
  } catch (e) {
    console.log(e);
  }
}
