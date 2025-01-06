import { useContext, useReducer } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import reducer from '../reducer/cartReducer';


const CartContext=createContext();

const getLocalCartData=()=>{
  let localCartData=localStorage.getItem("jatinCart");
  // jab 1st time cart load hoga then data will be empty ,therefore we have to give it an empty value
  // if(localCartData === []){
  //   return [];
  // }else{
  //   return JSON.parse(localCartData);
  //   //again to coinvert it back to array
  // }


  const parsedData=JSON.parse(localCartData);
  if(!Array.isArray(parsedData))  return [];
  return parsedData;
};

const initialState=
{
  // cart:[],
  cart: getLocalCartData(),
  total_item:"",
  total_price:"",
  shipping_fee:50000,

}

const CartProvider=({children})=>{//children ka 1st letter should be small

  const [state,dispatch]=useReducer(reducer,initialState);

  const addToCart=(id,color,amount,product)=>{
    dispatch({type:"ADD_TO_CART",payload:{id,color,amount,product}});
  }


  const removeItem=(id)=>{
   dispatch({type:"REMOVE_ITEM",payload:id})
  }


  // increase and decrease function

  const setDecrease=(id)=>{
   dispatch({type:"SET_DECREMENT",payload:id});
  }

  const setIncrease=(id)=>{
    dispatch({type:"SET_INCREMENT",payload:id});
  }

  // to add data in localStorage
//we want jab page refresh ho then data localstoirage me add ho jana chahiye
useEffect(()=>{
//we want when page loads or anything changes in cart then cart total item value should be changed, see on right corner on cart icon
  dispatch({type:"CART_TOTAL_ITEM"});
  dispatch({type:"CART_TOTAL_PRICE"});
  //key me storage ka naam
  //value should be string, therefore convert cart into string
  //we can't directly acces cart, it is present inside state
  localStorage.setItem("jatinCart",JSON.stringify(state.cart));

},[state.cart])//jab bhi cart me changes hoga ye run hoga


// to clear the cart
const clearCart=()=>{
  dispatch({type:"CLEAR_CART"});
}

    return (
      //these values are passed in provider so that any component in app can use these
    <CartContext.Provider value={{...state,addToCart,removeItem, clearCart, setDecrease, setIncrease, }}>
      {children}
    </CartContext.Provider>
    );
}

const useCartContext=()=>
{
  return useContext(CartContext);
}

export {CartProvider,useCartContext};