import { useState } from 'react';
import { useQuery } from 'react-query';
// Components
import Item from './Item/Item';
import Cart from './Cart/Cart';
import { Drawer, LinearProgress, Grid, Badge } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
// Styles       
import { Wrapper, StyledButton } from './App.styles';

// Types
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

const getProducts = async (): Promise<CartItemType[]> =>
  (await fetch('https://fakestoreapi.com/products')).json();


const App = () => {
  const { data, isLoading, error } = useQuery<CartItemType[]>('products', getProducts);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);

  data && console.log('data: ', data);

  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((acc, item) => acc + item.amount, 0);

  const handleAddToCart = (clickedItem: CartItemType) => {
    // const itemFound = cartItems.find(item => item.id === clickedItem.id);

    // if (itemFound) {
    //   itemFound.amount += 1;
    // } else {
    //   setCartItems([...cartItems, { ...clickedItem, amount: 1 }]);
    // }
    setCartItems(prev => {
      const itemFound = prev.find(item => item.id === clickedItem.id);

      if (itemFound) {
        return prev.map(item => (item.id === clickedItem.id ? { ...item, amount: item.amount + 1 } : item));
      }

      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

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

  if (isLoading)
    return <LinearProgress />

  if (error)
    return <div>Error! Something went wrong.</div>

  return (
    <Wrapper>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart cartItems={cartItems} addToCart={handleAddToCart} removeFromCart={handleRemoveFromCart} />
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color="secondary">
          <AddShoppingCartIcon />
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {data?.map((item: CartItemType) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
            <Item item={item} handleAddToCart={handleAddToCart}>

            </Item>
          </Grid>
        ))};
      </Grid>
    </Wrapper>
  );
}

export default App;
