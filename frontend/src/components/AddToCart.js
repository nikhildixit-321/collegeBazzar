import React,{useState} from 'react'
import styled from 'styled-components';
import { FaCheck } from "react-icons/fa";
import CartAmountToggle from './CartAmountToggle';
import {NavLink} from "react-router-dom";
import {Button} from "../styles/Button";
import { useCartContext } from '../context/cart_context';
 

const AddToCart = ({product}) => {
  const {addToCart}=useCartContext();
  const{id,colors,stock}=product;
  // states
  const[color,setColor] = useState(colors[0]);
  const[amount,setAmount] = useState(1);

// decreasing count
  const setDecrease=()=>{
    //if amount is >0 then decrement by 1 ,else setamount to 1
  amount>0 ?setAmount(amount -1): setAmount(1)
  }
// increasing count
  const setIncrease=()=>{
    //if value is less then ehat we have in stock then increment else set to stock
amount<stock ? setAmount(amount +1 ): setAmount(stock)
  }
  
  return (
    <Wrapper>
    <div className='colors'>
      <p>Colors: 
        {
          colors.map((curColor,index)=>{
          return(
            //jo bhi curcolor hai use background color set kar diya hai
            <button 
            key={index} 
            style={{backgroundColor:curColor}} 
            className={color === curColor? "btnStyle active": "btnStyle"}
            onClick={()=>setColor(curColor)}>
              {/* //click on any btn will set it as curcolor
             //active class to highlight the btn */}

            {color===curColor? <FaCheck className='checkStyle'/>: null}
            {/* //check icon on active color and null will hide text   */}
            </button>
          )
          })
        }
      </p>
    </div>

    {/* add to cart */}
    <CartAmountToggle 
    amount={amount}
    setDecrease={setDecrease}
    setIncrease={setIncrease}
    
    />
{/* color-jo state variable me hai,yani ki jo usr ne slect kiya hai,
product-singleproduct ka data hai jisko humne as aprop pass kiya h in singleproduct.js*/}
    <NavLink to="/cart" onClick={()=>addToCart(id,color,amount,product)}>
    <Button>Add To Cart</Button>
    </NavLink>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  .colors p {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .btnStyle {
    width: 2rem;
    height: 2rem;
    background-color: #000;
    border-radius: 50%;
    margin-left: 1rem;
    border: none;
    outline: none;
    opacity: 0.5;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }

  .active {
    opacity: 1;
  }

  .checkStyle {
    font-size: 1rem;
    color: #fff;
  }

  /* we can use it as a global one too  */
  .amount-toggle {
    margin-top: 3rem;
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 1.4rem;

    button {
      border: none;
      background-color: #fff;
      cursor: pointer;
    }

    .amount-style {
      font-size: 2.4rem;
      color: ${({ theme }) => theme.colors.btn};
    }
  }
`;

export default AddToCart