import { createContext, useContext, useEffect, useReducer } from "react";
import { useProductContext } from "./productcontext";
import reducer from '../reducer/filterReducer';


const FilterContext=createContext();//creating a context


const initialState={
  filter_products:[],//isme he products add krne hai
  all_products:[],
  grid_view:true,
  sorting_value:"lowest",
  filters:{
    text:"",
    category:"All",
    company:"All",
    color:"All",
    maxPrice:0,
    price:0,
    minPrice:0,
  }
}

//provider- wrap <app> component with it
export const FilterContextProvider =({children})=>{

  //we need products=[] from previous context(AppContext) ,which the usecontextprovider will give us
const {products}=useProductContext();

//now we got the products data, now we have to add it in state of Filtercontext ,use useReducer
const[state,dispatch]=useReducer(reducer,initialState);


// to set the grid view
const setGridView=()=>{
  return dispatch({type:"SET_GRID_VIEW"});
};

// to set the list view
const setListView=()=>{
  return dispatch({type:"SET_LIST_VIEW"});
};

// sorting function- to get value seected by user in sort filter and will perform action acoording to it in the reducer
 // sorting function
 //get the value with help of event object and pass as payload
 const sorting = (event) => {
  let userValue = event.target.value;
  dispatch({ type: "GET_SORT_VALUE", payload: userValue });
};



// to clear the filters
const clearFilters=()=>{
  dispatch({type:"CLEAR_FILTERS"});
}


//whenever user selects any filter option we want that wheeevr this value changes then the filter_products should be changed
// to sort the products
useEffect(() => {
  dispatch({type:"FILTER_PRODUCTS"});
  dispatch({ type: "SORTING_PRODUCTS" });
}, [products,state.sorting_value,state.filters]);

//update the filter values
const updateFilterValue=(event)=>{
  let name=event.target.name;
  let value=event.target.value;
  return dispatch({type:"UPDATE_FILTERS_VALUE",payload:{name,value}})
}

useEffect(()=>{
dispatch({type:"LOAD_FILTER_PRODUCTS",payload:products})
},[products])

return(
  <FilterContext.Provider value={{...state, setGridView, setListView,sorting,updateFilterValue,clearFilters,}}>
{children}
  </FilterContext.Provider>
);
}


//custom hook-taki usecontext ko hume baar-2 har jageh import na krna pade
export const useFilterContext =() =>{
  return useContext(FilterContext);
}

