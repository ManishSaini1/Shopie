import React from 'react';
import './App.css';
import Cart from './Cart';
import Navbar from './Navbar';

class App extends React.Component {
   constructor()
  {
    super();
    this.state={
     products :[
         {
            price :9999,
            title: "Mobile Phone",
            qty: 1,
            img: 'https://images.unsplash.com/photo-1567581935884-3349723552ca?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80',
            id:1
         }, 
         {
            price :999,
            title: "Watch",
            qty: 1,
            img: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1059&q=80',
            id:2
         },
         {
            price :39999,
            title: "Laptop",
            qty: 1,
            img: 'https://images.unsplash.com/photo-1548611635-b6e7827d7d4a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
            id:3
         }
     ]
    }
  }
  handleIncreaseQuantity= (product)=>{
      const {products}= this.state;
      const index= products.indexOf(product);
      products[index].qty+=1;
      this.setState({
          products
      })
  }
  handleDecreaseQuantity= (product)=>{
    const {products}= this.state;
    const index= products.indexOf(product);
    if(products[index].qty===0)
    {
        return;
    }
    products[index].qty-=1;
    this.setState({
        products
    })
}
handleDeleteProduct=(id)=>{
    const{products}=this.state;
    const items= products.filter((item)=>item.id!==id);
    this.setState({
        products : items
    });
}
getCarCount=()=>{
    const {products}= this.state;
    let count=0;
    products.forEach((product)=>
    {
      count+=product.qty;
    });
    return count;
}
getCartTotal=()=>
{
  const{products}=this.state;
  let total=0;
  products.forEach((product)=>
  {
    total+=product.price * product.qty

  });
  return total;
}
  render()
  {
    const {products} =this.state;
  return (
    <div className="App">
      <Navbar count={this.getCarCount()} />
       <Cart
       products  ={products}
       onIncreaseQuantity= {this.handleIncreaseQuantity}
       onDecreaseQuantity= {this.handleDecreaseQuantity}
       onDeleteProduct= {this.handleDeleteProduct}
      />
      <div style={{padding:20 , backgroundColor: '#AB6437', width: 'content-fit' }}>Total : {this.getCartTotal()}</div>
    </div>
  );
}
}

export default App;
