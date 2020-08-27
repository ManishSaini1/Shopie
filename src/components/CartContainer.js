import React, { Component } from "react";
import CartItem from "./CartItem";
import { updateCart } from "../actions/cart";
import { connect } from "react-redux";

class CartContainer extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      cartCount: 0,
    };
  }
  componentDidMount() {
    const products = JSON.parse(localStorage.getItem("cart"));
    let count = 0;
    products.map((product) => {
      count += product.qty;
    });
    this.props.dispatch(updateCart(count));
    console.log("products are in cmd car container", products);
    this.setState({
      products: products,
      cartCount: count,
    });
  }
  componentDidUpdate(prevState, currentState )
  {
    // if(prevState!==currentState)
    // {
    //   this.setState({
    //       products: currentState.products,
    //       carCount: currentState.carCount
    //   })
    // }
    console.log("Inside the coponened did update",prevState);
    console.log("Inside the coponened did update........",currentState);
  }
  handleIncreaseQuantity = (productId) => {
    let { cartCount } = this.state;
    let products = JSON.parse(localStorage.getItem("cart"));
    products = products.map((product) => {
      if (product.id === productId) {
        product.qty += 1;
      }
      return product;
    });
    console.log("MY prps are", this.props.dispatch);
    this.props.dispatch(updateCart(cartCount + 1));
    localStorage.setItem("cart", JSON.stringify(products));
    this.setState({
      products: products,
      cartCount: cartCount + 1,
    });
  };
  handleDecreaseQuantity = (productId) => {
    let { cartCount } = this.state;
    let products = JSON.parse(localStorage.getItem("cart"));
    products = products.map((product) => {
      if (product.id === productId) {
        if (product.qty > 0) {
          product.qty -= 1;
        }
      }
      return product;
    });
    localStorage.setItem("cart", JSON.stringify(products));
    if (cartCount > 0) {
      this.props.dispatch(updateCart(cartCount - 1));
      cartCount = cartCount - 1;
    }
    this.setState({
      products: products,
      cartCount,
    });
  };
  deleteProduct = (product) => {
    // console.log("Product in delete function", product);
    let products = JSON.parse(localStorage.getItem("cart"));
    products = products.filter((currentProduct) => {
      // console.log("product id current" , currentProduct.id);
      // console.log("prodcut id", product);
      return currentProduct.id != product;
    });
    localStorage.setItem("cart", JSON.stringify(products));
    this.setState({
      products: products,
    });
  };
  render() {
    const { products } = this.state;
    // console.log("products in render function cart" ,products.length);
    console.log("products in render function cart");
    return (
      <div>
        {products == null || products.length == 0 ? (
          <h1 id="no-item-heading">No items in Cart </h1>
        ) : (
          products.map((product) => {
            return (
              <CartItem
                product={product}
                onDeleteProduct={this.deleteProduct}
                onIncreaseQuantity={this.handleIncreaseQuantity}
                onDecreaseQuantity={this.handleDecreaseQuantity}
              />
            );
          })
        )}
      </div>
    );
  }
}

export default connect()(CartContainer);
