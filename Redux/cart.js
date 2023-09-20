import { createSlice } from '@reduxjs/toolkit'

  // Redux Toolkit allows us to write "mutating" logic in reducers. It
 // doesn't actually mutate the state because it uses the Immer library,
 // which detects changes to a "draft state" and produces a brand new
 // immutable state based off those changes 

// cartNo is supposed to calculate the number of items in the cart altogether
// cartItems is the array of objects of the items in the cart as the products are in the databse i.e id, title, author, price
// cartTotal calculates the total amount of all items in the cart
// cartProducts holds the titles of the products in the cart as a string for the pirpose of dropping it in the order table
// cartQtys holds the quantity of each titles in cartProducts respectively to be dropped in the order table

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartNo: 0,
    cartItems: [],
    cartTotal: 0,
    cartProducts:"",
    cartQtys:""

  },
  reducers: {
    setCartNo: (state, action) => {
      state.cartNo += action.payload;

    },
    subCartNo: (state, action) => {
      state.cartNo -= action.payload;
    },
    setCartTotal: (state, action) => {
      state.cartTotal = action.payload;

    },
    setCartItems: (state, action) => {
      state.cartItems.push(action.payload);
     

    },
    setCartProducts: (state, action) => {
      state.cartProducts = action.payload;

    },
    setCartQtys: (state, action) => {
      state.cartQtys = action.payload;

    },
    removeItem:(state, action) => {
      state.cartItems = state.cartItems.filter(data => data.id != action.payload);
      
    },


    cartPlus: (state) => {
      state.cartItems += 1
    },

    cartMinus: (state) => {
      if (state.cartItems == 0) {
        state.cartItems = 0
      } else {
        state.cartItems -= 1;
      }
    },
    resetCart: (state, action) => {
      initialState
    }

    // incrementByAmount: (state, action) => {
    //   state.cartItems += action.payload
    // },
  },
})

// Action creators are generated for each case reducer function
export const { setCartNo, subCartNo, setCartTotal, setCartItems, setCartProducts, setCartQtys, removeItem,  cartPlus, cartMinus, resetCart } = CartSlice.actions

export default CartSlice.reducer