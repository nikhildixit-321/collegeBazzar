


const cartReducer = (state,action) => {

  if(action.type=== "ADD_TO_CART"){
    let {id,color,amount,product}=action.payload;
    // console.log(product);

    // tackle if a product already exists in the cart
    let existingProduct=state.cart.find((curItem)=>{
      return  curItem.id === id + color;  //cart me jo curItem hai kya uski id , jo prd usr cart me add kr rha hai uski id, color se match krti hai
    })


    if(existingProduct)
    {
      // if already exists we have to find it and increse its quanitity
      let updatedProduct =state.cart.map((curElem)=>{

        if(curElem.id === id + color){
          let newAmount= curElem.amount + amount;

          // check it should be less than stock
          if(newAmount >= curElem.max){
            newAmount=curElem.max;
          }
          return {
            //curelem aisa he rakho bas amount wil be newAmount
            ...curElem,
            amount:newAmount,
          }
        }else{
          return {
            curElem,
          }
        }
        
      });

      return{
        ...state,
        cart: updatedProduct,//jo pehle data hai uske baad add hoga cartProduct
      }

    }else{
      //if does not exists we normally add it
          let cartProduct;
          cartProduct={
            id:id + color, //same prd with diff. color should have diff id, otherwise diff. color produtc will add in 1 prdt.
            name:product.name,
            color,
            amount,
            image:product.image[0].url,//we get multiple image and we only want 1
            price:product.price,
            max:product.stock,
          }
      
          return{
            ...state,
            cart: [ ...state.cart , cartProduct],//jo pehle data hai uske baad add hoga cartProduct
          }
    }
  }



  if(action.type=== "REMOVE_ITEM"){
    let updatedCart=state.cart.filter((curItem)=>{
      return curItem.id !== action.payload;  //jis curitem ki id, jo hume id mili hai uske equal nahi h vo de do
    })
    return{
      ...state,
      cart:updatedCart,
    }
  }


  if(action.type === "CLEAR_CART"){
    return{
      ...state,
      cart:[],
    }
  }

 

  if (action.type === "SET_DECREMENT") {
    // find the prduct whole icon is clicked and decrement amount by 1
    let updatedProduct = state.cart.map((curElem) => {
      if (curElem.id === action.payload) {
        let decAmount = curElem.amount - 1;

        if (decAmount <= 1) {
          decAmount = 1;
        }

        return {
          ...curElem,
          amount: decAmount,
        };
      } else {
        return curElem;
      }
    });
    return { ...state, cart: updatedProduct };
  }


  if (action.type === "SET_INCREMENT") {
    let updatedProduct = state.cart.map((curElem) => {
      if (curElem.id === action.payload) {
        let incAmount = curElem.amount + 1;

        if (incAmount >= curElem.max) {
          incAmount = curElem.max;
        }

        return {
          ...curElem,
          amount: incAmount,
        };
      } else {
        return curElem;
      }
    });
    return { ...state, cart: updatedProduct };
  }



  if (action.type === "CART_TOTAL_ITEM") {
    //whenver we want to add,subtract... use reduce method
    let updatedItemVal = state.cart.reduce((initialVal, curElem) => {
      let { amount } = curElem; //curelem is cart

      initialVal = initialVal + amount;
      return initialVal;
    }, 0);//0-initial value hai

    return {
      ...state,
      total_item: updatedItemVal,
    };
  }

 
  if (action.type === "CART_TOTAL_PRICE") {
    let total_price = state.cart.reduce((initialVal, curElem) => {
      let { price, amount } = curElem;//curelem is cart

      initialVal = initialVal + price * amount;
      // 25000 + 0 = 25000
      // 10199 + 25000 = 121

      return initialVal;
    }, 0);

    return {
      ...state,
      total_price,
    };
  }
 
  return state;
}

export default cartReducer