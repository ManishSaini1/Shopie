import React from 'react';
import '../App.css';
import Cart from './CartContainer';
import Navbar from './Navbar';
import {AllProducts} from './index';
import {Route , Switch, BrowserRouter as Router ,} from 'react-router-dom'
import { connect } from 'react-redux';

class App extends React.Component {
   constructor()
  {
    super();
    this.state={
     products :[],
     loading: true
    }
  }
  
  handleIncreaseQuantity= (product)=>{
      const {products}= this.state;
      const index= products.indexOf(product);
      const docRef= this.db.collection('products').doc(products[index].id);
      docRef.update({
        qty : products[index].qty  +1
      })
      .then(()=>
      {
        console.log('Updated SuccessFully');
      })
      .catch((error)=>
      {
        console.log('error', error);
      })
      // products[index].qty+=1;
      // this.setState({
      //     products
          
      // })
  }
  handleDecreaseQuantity= (product)=>{
    const {products}= this.state;
    const index= products.indexOf(product);
    const docRef= this.db.collection('products').doc(products[index].id);
    if(products[index].qty===0)
    {
        return;
    }
    docRef.update({
      qty : products[index].qty  -1
    })
    .then(()=>
    {
      console.log('Updated SuccessFully');
    })
    .catch((error)=>
    {
      console.log('error', error);
    })
  }
 
//     products[index].qty-=1;
//     this.setState({
//         products
//     })
// }
handleDeleteProduct=(id)=>{
    //const{products}=this.state;
    const docRef=this.db.collection('products').doc(id);
    docRef.delete()
    .then(()=>
    {
      console.log('Deletedd SuccessFully');
    })
    .catch((error)=>
    {
      console.log('error', error);
    })
  
    // const items= products.filter((item)=>item.id!==id);
    // this.setState({
    //     products : items
    // });
}
getCarCount=()=>{
   
    return this.props.cart;
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
    <Router>
    <div className="App">
      <Navbar count={this.getCarCount()} />
      <Switch>
      {/* <button onClick={this.addProduct} style={{padding:20, fontSize: 20}}>Add Product</button> */}
      <Route
      exact
      path='/'
      component={AllProducts}
      />
      <Route
      path='/cart'
      render={()=>
      {
        return (
          <Cart
          products  ={products}
          onIncreaseQuantity= {this.handleIncreaseQuantity}
          onDecreaseQuantity= {this.handleDecreaseQuantity}
          onDeleteProduct= {this.handleDeleteProduct}
         />
        )
      }}
      />
     
      <div>{loading && <h1>Loading...</h1> } </div>
      <div style={{padding:20 , backgroundColor: '#AB6437', width: 'content-fit' }}>Total : {this.getCartTotal()}</div>
      </Switch>
    </div>
    </Router>
  );
}
}

function mapStateToProps(state)
{
  console.log("State is%%%%%%%%%%%%%%%%%%%%%%%%%%", state);
    return {
      cart :state.cart
    }
}
export default connect(mapStateToProps)( App);
