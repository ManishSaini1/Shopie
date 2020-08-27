import  {UPDATE_CART} from './actionTypes'
export function updateCart(cartItemCount)
{
        return{
            type:UPDATE_CART,
            cartItemCount
        }
}