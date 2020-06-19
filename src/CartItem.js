import React from 'react';

class CartItem extends React.Component {
  constructor()
  {
    super();
    this.state={
      price :999,
      title: "Mobile Phone",
      Qty: 1,
      img: ''
    }
  }
  render () {
    return (
      <div className="cart-item">
        <div className="left-block" style={styles.image}>
          <img style={styles.image} alt="h"  />
        </div>
        <div className="right-block">
    <div style={ { fontSize: 25 } }>{this.state.title}</div>
    <div style={ { color: '#777' } }>Rs {this.state.price}</div>
          <div style={ { color: '#777' } }>Qty: {this.state.Qty}</div>
          <div className="cart-item-actions">
            {/* Buttons */}
            <img alt="plus" className="action-icons" src="https://image.flaticon.com/icons/svg/992/992651.svg"></img>
            <img alt="minus" className="action-icons" src="https://image.flaticon.com/icons/svg/864/864373.svg"></img>
            <img alt="delete" className="action-icons" src="https://image.flaticon.com/icons/svg/3096/3096687.svg"></img>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  image: {
    height: 130,
    width: 110,
    borderRadius: 4,
    background: '#ccc'
  }
}

export default CartItem;