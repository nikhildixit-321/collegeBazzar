const filterReducer=(state,action)=>{

switch (action.type) {
  case "LOAD_FILTER_PRODUCTS":

  //  when page loads we want price filter to have maxPrice value and products with that maxprce should load
    let priceArr = action.payload.map((curElem) => curElem.price);
    // console.log(
    //   "🚀 ~ file: filterReducer.js ~ line 5 ~ filterReducer ~ priceArr",
    //   priceArr
    // );

    // 1way-to get max from array
    // console.log(Math.max.apply(null, priceArr));

    // 2nd way-Reduce method
    // let maxPrice = priceArr.reduce(
    //   (initialVal, curVal) => Math.max(initialVal, curVal),
    //   0
    // );
    // console.log(
    //   "🚀 ~ file: filterReducer.js ~ line 16 ~ filterReducer ~ maxPrice",
    //   maxPrice
    // );

    // 3rd -using spread operator
    let maxPrice = Math.max(...priceArr);
    // console.log(
    //   "🚀 ~ file: filterReducer.js ~ line 23 ~ filterReducer ~ maxPrice",
    //   maxPrice
    // );
    return{
      ...state,
      filter_products:[...action.payload],
      all_products:[...action.payload], //we are using ... because we don't want to make changes inn original data, ... means we are making changes in copy of original data and not original data
      filters: { ...state.filters,maxPrice, price: maxPrice },
    }
    
  case "SET_GRID_VIEW":
    return{
    ...state,
    grid_view:true,
    }
     
  case "SET_LIST_VIEW":
    return{
    ...state,
    grid_view:false,
    }


    case "GET_SORT_VALUE":
      // id ke through data get kra phir uske andar se index select kiya
      // let userSortValue = document.getElementById("sort");
      // let sort_value = userSortValue.options[userSortValue.selectedIndex].value;//usersortvalue ke andar options hain u me se seected index ki value
      // console.log(sort_value); 
      return {
        ...state,
        sorting_value: action.payload,
      };


      case "SORTING_PRODUCTS":
        let newSortData;
        // let tempSortProduct = [...action.payload];
  
        const { filter_products, sorting_value } = state;
        let tempSortProduct = [...filter_products];//because we don't ant to make changes in original data threfore created acopy

  //compare function
        const sortingProducts = (a, b) => {
          if (sorting_value === "lowest") {
            return a.price - b.price;//ye minus nahi kr rha hai,inki trick hai aise likne se ye lowest wala pehle dikhata hai
          }
  
          if (sorting_value === "highest") {
            return b.price - a.price;
          }
  
          if (sorting_value === "a-z") {
            return a.name.localeCompare(b.name);//caomparing on basis of name, 'a' pehle aata hai toh ascending order 
          }
  
          if (sorting_value === "z-a") {
            return b.name.localeCompare(a.name);//a baad me aata hai therefore decending order
          }
        };
  
        newSortData = tempSortProduct.sort(sortingProducts);//using compare function which comes in sorting
  
        return {
          ...state,
          filter_products: newSortData,
        };


    case "UPDATE_FILTERS_VALUE":
      const{name,value}=action.payload;
      return{
        ...state,
        filters:{
          ...state.filters,
          [name]:value,     //jo data hai vo asitis pada rahega bas ,bas name ki jageh value chali jayegi, and name=text for now,therefore jo usr likhega vo text me chala jayega
        }
      }


    case "FILTER_PRODUCTS":
      let {all_products}=state;
      let tempFilterProduct=[...all_products];

      const {text,category,company,color,price}=state.filters;
//if text ki value change hoti hai toh ye run karega
      if(text){
      //filter me jo match kr gaya uska poora ka poora data aata hai,agar map use krte toh vo particular property milta
      tempFilterProduct=tempFilterProduct.filter((curElem)=>{
      return curElem.name.toLowerCase().includes(text);//ye vo products return kr dega jiske name me ye text(jo usr type karega) included hai ya nahi
      });
      }

      //mtlb jab category all nahi hogi tabhi filter chalega,therefore all wale ke liye nahi chalega asitis show hoga
      if(category !== "All"){
        tempFilterProduct = tempFilterProduct.filter(
          (curElem) => curElem.category === category
        ); //jitna bhi data hai unme aisi category ki filter out kr do jo mere is category(jo usr ne filter ui me select ki hai) se mtch ho rahi ho.
        }

        if (company !== "All") {
          tempFilterProduct = tempFilterProduct.filter(
            (curElem) => curElem.company.toLowerCase() === company.toLowerCase()
          );
        }



        if(color !== "All"){
          tempFilterProduct = tempFilterProduct.filter(
            (curElem) => curElem.colors.includes(color)//kya jo curElem ka colors array hai uske andar jo usr ne color select kiya hai vo hai ,hai toh us product ko dikha do]
          );
        }
       
        if(price === 0){
          tempFilterProduct = tempFilterProduct.filter(
            (curElem) => curElem.price === price //user select 0 price then show prdt equal to this price
          );
        }else{
          tempFilterProduct = tempFilterProduct.filter(
            (curElem) => curElem.price <= price //hume vo products dikhane hain jinka price, price(jo use ne set kiya with input filter) ke equal ya kam ho
          );
        }
      return{
        ...state,
        filter_products: tempFilterProduct,
      }



      case "CLEAR_FILTERS":
        return {
          ...state,
          filters:{
            ...state.filters,
            text:"",
    category:"All",
    company:"All",
    color:"All",
    maxPrice:state.filters.maxPrice,
    price:state.filters.maxPrice,
    minPrice:0,

          }

        }
  default:
    return state;
}

}

export default filterReducer;