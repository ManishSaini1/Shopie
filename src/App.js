import React from 'react';
import './App.css';
import Cart from './Cart';
import Navbar from './Navbar';
import * as firebase from 'firebase';

class App extends React.Component {
   constructor()
  {
    super();
    this.state={
     products :[],
     loading: true
    }
    this.db=firebase.firestore();
  }
  componentDidMount()
  {
    // firebase
    // .firestore()
    // .collection('products')
    // .get()
    // .then((snapshot)=>{
    //   const products= snapshot.docs.map((doc)=>
    //   {
    //     const data=doc.data();
    //     data['id']= doc.id;
    //     return data;
    //   });
    //   this.setState({
    //     products,
    //     loading :false
    //   })
    // })
    this.db
    .collection('products')
    .onSnapshot((snapshot)=>{
      const products= snapshot.docs.map((doc)=>
      {
        const data=doc.data();
        data['id']= doc.id;
        return data;
      });
      this.setState({
        products,
        loading :false
      })
    })
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
addProduct=()=>{
  this.db
  .collection('products')
  .add(
    {
      img :'',
      price :334,
      qty :4,
      title :"Washing Machine"
    })
    .then((docRef)=>
      {
        console.log("Product has been added",docRef);
      })
}
  render()
  {
    const {products, loading} =this.state;
  return (
    <div className="App">
      <Navbar count={this.getCarCount()} />
      <button onClick={this.addProduct} style={{padding:20, fontSize: 20}}>Add Product</button>
       <Cart
       products  ={products}
       onIncreaseQuantity= {this.handleIncreaseQuantity}
       onDecreaseQuantity= {this.handleDecreaseQuantity}
       onDeleteProduct= {this.handleDeleteProduct}
      />
      <div>{loading && <h1>Loading...</h1> } </div>
      <div style={{padding:20 , backgroundColor: '#AB6437', width: 'content-fit' }}>Total : {this.getCartTotal()}</div>
    </div>
  );
}
}

export default App;
