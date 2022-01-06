import React, { useState } from 'react';
import logo from './logo.svg';
import { useQuery } from 'react-query';
import { Badge, colors, Drawer, Grid, LinearProgress } from '@material-ui/core';
import { StyledButton, Wrapper } from './App.styles';
import Item from "./Item/Item";
import { AddShoppingCart } from '@material-ui/icons';
import { Cart } from './Cart/Cart';

export type CartItemType = {
  id: number;
  category: string;
  image: string;
  price: number;
  title: string;
  description: string;
  amount: number;
}

const getProducts = async (): Promise<CartItemType[]> => {
  return await (await fetch('https://fakestoreapi.com/products')).json()
}
const App = () => {
  const [cartOpen, setCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([] as CartItemType[])
  const { data, isLoading, error} = useQuery<CartItemType[]>('products', getProducts)

  const getTotalItems = (items: CartItemType[]) => 
     items.reduce((ack: number, item) => ack + item.amount, 0)
  

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems(prev => {
      const isItemInCart = prev.find(item => item.id === clickedItem.id)
      if (isItemInCart) {
        return prev.map(item => 
          item.id === clickedItem.id
          ? { ...item, amount: item.amount + 1}
          : item 
        )
      }

      return [...prev, {...clickedItem, amount: 1}]
    });
  }

  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[])
    );
  };

  if (isLoading) return <LinearProgress />
  if (error) return <div>Something went wrong...</div>


  return (
    <Wrapper>
      <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart 
          cartItems={cartItems} 
          addToCart={handleAddToCart} 
          removeFromCart={handleRemoveFromCart } 
          />
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>

        <Badge badgeContent={getTotalItems(cartItems)} color='error'>
          <AddShoppingCart/>
        </Badge>
      </StyledButton>
        <Grid container spacing={3}>
          {data?.map(item => (
            <Grid item key={item.id} xs={12} sm={4}>
              <Item item={item} handleAddToCart={handleAddToCart}></Item>
            </Grid>
          ))}
        </Grid>
      
    </Wrapper>
  );
}

export default App;