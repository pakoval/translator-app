import axios from "axios";

const BASE_URL =
  "https://translate.googleapis.com/translate_a/single?client=gtx&sl=";

export async function createURL(source: string, target: string, text: string) {
  const url = `${
    BASE_URL + source + "&tl=" + target + "&dt=t&q=" + encodeURI(text)
  }`;

  try {
    const { data } = await axios.get(url);
    // data[0][0][0] here gets results of translation
    return data[0][0][0];
  } catch (error) {
    console.log(error);
  }
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
