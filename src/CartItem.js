import React from 'react';

const CartItem = (props)=> {
    const {title, price, qty}= props.product;
    const {product, onIncreaseQuantity, onDecreaseQuantity, onDeleteProduct} = props;
    return (
      <div className="cart-item">
        <div className="left-block" >
          <img style={styles.image} src={product.img} alt="prod imag" />
        </div>
        <div className="right-block">
    <div style={ { fontSize: 25 } }>{title}</div>
    <div style={ { color: '#777' } }>Rs {price}</div>
          <div style={ { color: '#777' } }>Qty: {qty}</div>
          <div className="cart-item-actions">
            {/* Buttons */}
            <img 
            alt="plus" 
            className="action-icons" 
            src="https://image.flaticon.com/icons/svg/992/992651.svg"
            onClick= {() =>onIncreaseQuantity(product)}
          />
          
            <img 
            alt="minus" 
            className="action-icons" 
            src="https://image.flaticon.com/icons/svg/864/864373.svg"
             onClick= {()=>onDecreaseQuantity(product)} 
            />
            <img 
            alt="delete" 
            className="action-icons" 
            src="https://image.flaticon.com/icons/svg/3096/3096687.svg"
            onClick={()=> onDeleteProduct(product.id)}
            />
          </div>
        </div>
      </div>
    );
  }


const styles = {
  image: {
    height: 150,
    width: 130,
    borderRadius: 4,
    background: '#ccc'
  }
}

export default CartItem;
// constructor()
  // {
  //   super();
  //   this.state={
  //     price :999,
  //     title: "Mobile Phone",
  //     qty: 1,
  //     img: ''
  //   }
  // }
    // decreaseQuantity =()=>{
      
    //   this.setState((prevState)=>{
    //     if(prevState.qty<=0)
    //     {
    //       return;
    //     }
    //     return{
    //     qty :prevState.qty -1
    //     }
    //   });
    // }
    // increaseQuantity =()=>{
    //   //from 1 for set State
    //   //  this.setState({
    //   //     title : "new Title  "
    //   //   });
        
    //   //form 2 set State
    //   this.setState((prevState)=>{
    //     return{
    //       qty : prevState.qty+1
    //     }
    //   });
    // console.log(this.state);