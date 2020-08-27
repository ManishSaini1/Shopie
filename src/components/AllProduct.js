import React, { Component } from "react";
import { connect } from "react-redux";
import { updateCart } from "../actions/cart";
import { fetchProducts } from "../actions/products";
import "../css/allProducts.css";
class AllProduct extends Component {
  constructor() {
    super();
    this.abortController = new AbortController();
    this.state = {
      items: [],
    };
  }

  async componentDidMount() {
    const products = JSON.parse(localStorage.getItem("cart"));
    let count = 0;
    products.map((product) => {
      count += product.qty;
    });
    this.props.dispatch(updateCart(count));

    await this.props.dispatch(fetchProducts(), {
      signal: this.abortController,
    });
  }
  componentWillUnmount() {
    this.abortController.abort();
  }
  addItemsToCart = (productId) => {
    console.log("product id id ",productId );
    let cartItems = localStorage.getItem("cart");
    let cartAllItems = [];
    if (cartItems == null) {
      localStorage.setItem("cart", JSON.stringify(cartAllItems));
    }
    cartAllItems = JSON.parse(localStorage.getItem("cart"));
    let toadd = true;
    cartAllItems.map((item) => {
      if (item.id == productId.id) {
        window.alert("Item is Already in Cart");
        toadd = false;
      }
      return item;
    });
    if (toadd) {
      let newCart = [productId, ...cartAllItems];
      localStorage.setItem("cart", JSON.stringify(newCart));
    }
  };
  componentDidUpdate(prevProps, currentProps )
  {
    console.log("Inside the coponened did update",prevProps);
    console.log("Inside the coponened did update........",currentProps);
  }

  render() {
    let { products } = this.props;
    var itemsInStorage = localStorage.getItem("products");
    let productToShow = ["1", "2"];
    if (itemsInStorage == null || itemsInStorage == "[]") {
      productToShow = products;
      localStorage.setItem("products", JSON.stringify(products));
    } else {
      productToShow = JSON.parse(localStorage.getItem("products"));
    }

    console.log("Product to show", productToShow);
    return (
      <div className="all-products">
        {productToShow.map((product) => {
          return (
            <div className="product-item" key={product.id}>
              <div className="left-block product-image">
                <img
                  className="product-image" alt="product"
                  style={styles.image}
                  src={product.img}
                />
              </div>
              <div className="right-block">
                <div style={{ fontSize: 25 }}>{product.title}</div>
                <div className="product-price" style={{ color: "#777" }}>
                  {" "}
                  {`Rs. ${product.price}`}
                </div>
                {/* <div className="produt" style={{ color: "#777" }}>Qty: {product.qty}</div> */}

                {/* Buttons */}
                {/* <img
                    alt="plus"
                    className="action-icons"
                    src="https://image.flaticon.com/icons/svg/992/992651.svg"
                    // onClick= {() =>onIncreaseQuantity(product)}
                  /> */}

                {/* <img
                    alt="minus"
                    className="action-icons"
                    src="https://image.flaticon.com/icons/svg/864/864373.svg"
                    //  onClick= {()=>onDecreaseQuantity(product)}
                  />
                  <img
                    alt="delete"
                    className="action-icons"
                    src="https://image.flaticon.com/icons/svg/3096/3096687.svg"
                    // onClick={()=> onDeleteProduct(product.id)}
                  /> */}
                <div>
                  <button className="edit-button">
                    <img
                      alt="edit"
                      className="action-icons"
                      src="https://image.flaticon.com/icons/svg/148/148926.svg"
                      // onClick={()=> onDeleteProduct(product.id)}
                    />
                    Edit Item
                  </button>
                </div>
                <div>
                  <button className="edit-button">
                    <img
                      alt="plus"
                      className="action-icons"
                      src="https://image.flaticon.com/icons/svg/992/992651.svg"
                      onClick={() => this.addItemsToCart(product)}
                    />
                    Add to Cart
                  </button>
                </div>

                <div>
                  <button className="edit-button">
                    <img
                      alt="delete"
                      className="action-icons"
                      src="https://image.flaticon.com/icons/svg/3096/3096687.svg"
                      // onClick={()=> onDeleteProduct(product.id)}
                    />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
const styles = {
  image: {
    height: 170,
    width: 130,
    // borderRadius: 4,
    background: "#ccc",
  },
};
function mapStateToProps(state) {
  return {
    products: state.products,
  };
}

export default connect(mapStateToProps)(AllProduct);
