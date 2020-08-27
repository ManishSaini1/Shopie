import {UPDATE_CART} from '../actions/actionTypes';
export default function products(state=0, action) {

    console.log("*****^^^^^^^^^^^^^^^^^I m here in cart reducer");
    switch (action.type) {
        case UPDATE_CART: {
          return action.cartItemCount;
        }
        default :
        return state;
      }
    }
   