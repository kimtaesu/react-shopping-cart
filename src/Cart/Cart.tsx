
import React from 'react'
import { CartItemType } from '../App'
import CartItem from '../CartItem/CartItem'
import { Wrapper } from './Cart.styles'

interface Props {
    cartItems: CartItemType[]
    addToCart: (clickedItem: CartItemType) => void
    removeFromCart: (id: number) => void;
};

export const Cart = (props: Props) => {

    const { cartItems, addToCart, removeFromCart } = props
    return (
        <Wrapper>
            <h2>Your Shopping Cart</h2>
            {cartItems.length === 0 ? <p>No items in cart.</p> : null}
            {cartItems.map(item => (
                <CartItem 
                    key={item.id}
                    item={item}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}/>
            ))}
        </Wrapper>
    )
}
