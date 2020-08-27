import { UPDATE_PRODUCTS } from "./actionTypes";

export function fetchProducts() {
  return (dispatch) => {
    const URL =
      "http://my-json-server.typicode.com/ManishSaini1/Shopie/all-products";
    fetch(URL)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("In fetching acitons",data);
        dispatch(updateProducts(data));
      })
      .catch((error)=>
      {
          console.log("ERrro in fetching peoducts", error);
      })
  };
}

export function updateProducts(products)
{
    console.log("in action update", products);
    return {
        type:UPDATE_PRODUCTS,
        products
    }
}