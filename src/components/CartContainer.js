import React, { Component } from "react";
import CartItem from "./CartItem";
import { updateCart } from "../actions/cart";
import { connect } from "react-redux";
import Noty from "noty";
import "../../node_modules/noty/lib/noty.css";
import "../../node_modules/noty/lib/themes/mint.css";

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
    console.log("products are in cmd car container*(*(*(*(", products);

    let count = 0;
    if(products===null)
    {
      return;
    }
    products.map((product) => {
      count += product.qty;
      return product;
    });
    this.props.dispatch(updateCart(count));
        this.setState({
      products: products,
      cartCount: count,
    });
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
    setTimeout(function () {
      new Noty({
        text: "Quantity Increased by 1",
        timeout: 1500,
        type: "info",
      }).show();
    }, 100);
    
  };
  handleDecreaseQuantity = (productId) => {
    let { cartCount } = this.state;
    let products = JSON.parse(localStorage.getItem("cart"));
    products = products.map((product) => {
      if (product.id === productId) {
        if (product.qty > 0) {
          setTimeout(function () {
            new Noty({
              text: "Quantity Decreased by 1",
              timeout: 1500,
              type: "error",
            }).show();
          }, 100);
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
    let {cartCount} = this.state;
    let count=0;
    let products = JSON.parse(localStorage.getItem("cart"));
    products = products.filter((currentProduct) => {
      // console.log("product id current" , currentProduct.id);
      // console.log("prodcut id", product);
      if(currentProduct.id===product)
      {
        console.log(" i m here in delete car fun" , currentProduct.qty);
        cartCount-=currentProduct.qty;
      }
      return currentProduct.id !== product;
    });
    console.log("before cart Count", cartCount);
    cartCount-=count;
    console.log("after cart Count", cartCount);
    localStorage.setItem("cart", JSON.stringify(products));
   this.props.dispatch(updateCart(cartCount));
    this.setState({
      products :products,
      cartCount
    })
    setTimeout(function () {
      new Noty({
        text: "Item deleted from cart",
        timeout: 1500,

        type: "error",
      }).show();
    }, 100);
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
