// create a context
// provider
// consumer-usecontext hook

import { useEffect } from "react";
import { createContext, useContext } from "react";
import axios from "axios";
import { useReducer } from "react";
//imported productreducer as reducer
import reducer from '../reducer/productReducer';



// creating a context

const AppContext=createContext();


const API = "https://api.pujakaitem.com/api/products";

const initialState={
  isLoading:false,
  isError:false,
  products:[],
  featureProducts:[],
  //for singleproduct page
  isSingleLoading:false,
  singleProduct:{},
}


const AppProvider=({children})=>{

  const[state,dispatch]=useReducer(reducer,initialState);


	const getProducts= async(url) =>{
    dispatch({type:"SET_LOADING"});
    try{
      const res=await axios.get(url);
  
      const products=await res.data;
      dispatch({type:"SET_API_DATA",payload:products});
    }catch(error){
      dispatch({type:"API_ERROR"})
    }
	 };

  
  useEffect(()=>{
   getProducts(API);
  },[])



 
const getSingleProduct = async(url)=>{
  dispatch({type:"SET_SINGLE_LOADING"});
try {
  const res=await axios.get(url);
  const singleProduct=await res.data;
  dispatch({type:"SET_SINGLE_PRODUCT",payload:singleProduct});
} catch (error) {
  dispatch({type:"SET_SINGLE_ERROR"});
}
};


  return <AppContext.Provider value={{...state,getSingleProduct}}>
{children}
  </AppContext.Provider>
};


//custom hook
const useProductContext=()=>{
  return useContext(AppContext);
}



export {AppProvider,AppContext,useProductContext};