import { client } from "./Api";

export const getCart = () => {
  const cartID = localStorage.getItem("cartID");
  const accessToken = localStorage.getItem("USER_ACCESS_TOKEN");

  try {
    return client.get(`/ad/carts/${cartID}/items/`);
  } catch {
    return null;
  }
};

export const addToCart = async (itemID, quantity = 1) => {
  const cartID = localStorage.getItem("cartID");

  if (cartID) {
    return client.post(`/ad/carts/${cartID}/items/`, {
      product_id: itemID,
      quantity,
    });
  } else {
    // create cart then add item
    return client.post("/ad/carts/").then((data) => {
      console.log("data", data);
      const {
        data: { id },
      } = data;
      localStorage.setItem("cartID", id);
      return client.post(`/ad/carts/${id}/items/`, {
        product_id: itemID,
        quantity,
      });
    });
  }
};
