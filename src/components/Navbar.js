import React from 'react';
import {Link} from 'react-router-dom';
import '../css/navbar.css'
const Navbar = (props) => {
    return (
     
      <div id="nav-container">
    <div style={styles.nav}>
     
      <div style={styles.cartIconContainer}>
      <Link to="/cart">

        <img style={styles.cartIcon} src=" https://image.flaticon.com/icons/svg/777/777205.svg" alt="cart-icon" />
        <span style={styles.cartCount}>{props.count}</span>
        </Link>
      </div>
    </div>
    <div id="nav-links">
    <div id="nav-products">
        <Link to="/">
        <button> Products</button>  
       
        
        </Link>
        </div>
       
      <div id="nav-cart">
      <Link to="/cart">
        <button> Cart</button>
       
        
      </Link>
      </div>
      </div>
    </div>
  );
}

const styles = {
  cartIcon: {
    height: 32,
    marginRight: 20
  },
  nav: {
    height: 50,
    background: '#4267b2',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  cartIconContainer: {
    position: 'relative'
  },
  cartCount: {
    background: 'yellow',
    borderRadius: '50%',
    padding: '4px 8px',
    position: 'absolute',
    right: 0,
    top: -9
  }
};


export default Navbar;
