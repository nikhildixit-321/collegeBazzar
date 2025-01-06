const ProductReducer=(state,action)=>{
  //mtlb agar action setloading ho tab initial state toh return kr va do lekin usme isloading ko true set kr do
  switch (action.type) {
    case "SET_LOADING":
      return {
            ...state,
            isLoading:true,
          };

          case "SET_API_DATA":
            // we have filtered the data where featured value is true
            const featureData=action.payload.filter((curElem)=>{
            return curElem.featured===true;
            });
      
            return{
              ...state,
              isLoading:false,//baceuse hume data mil gaya hai
              products:action.payload,//humne products array bhej diya
              featureProducts:featureData,
            };
    case "API_ERROR":
      return {
        ...state,
            isLoading:false,
            isError:true,
          };


    // for single product page
    case "SET_SINGLE_LOADING":
      return {
            ...state,
            isSingleLoading:true,
          };

    case "SET_SINGLE_PRODUCT":
      return {
        ...state,
        isSingleLoading:false,
        singleProduct:action.payload,
      };

    case "SET_SINGLE_ERROR":
      return{
        ...state,
        isSingleLoading:false,
        isError:true,
      };
          
    default:
     return state;
  }

};

export default ProductReducer;