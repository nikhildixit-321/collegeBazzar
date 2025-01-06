import React from 'react'
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import {FiShoppingCart} from "react-icons/fi";
import {CgMenu,CgClose} from "react-icons/cg";
import { useState } from 'react';
import { useCartContext } from '../context/cart_context';
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from '../styles/Button';


const Nav = () => {

  const[menuIcon,setMenuIcon]=useState();
  const{total_item}=useCartContext();

  const { user,loginWithRedirect , logout, isAuthenticated } = useAuth0();

  const Nav = styled.nav`
  .navbar-lists {
    display: flex;
    gap: 4.8rem;
    align-items: center;

    .navbar-link {
      &:link,
      &:visited {
        display: inline-block;
        text-decoration: none;
        font-size: 1.8rem;
        font-weight: 600;
        text-transform: uppercase;
        color: ${({ theme }) => theme.colors.black};
        transition: color 0.3s linear;
      }

      &:hover,
      &:active {
        color: ${({ theme }) => theme.colors.helper};
      }
    }
  }

  // so that the mobile buttons don't get displayed
  .mobile-navbar-btn {
    display: none;
    background-color: transparent;
    cursor: pointer;
    border: none;
  }

  // mobile me sirf 1 he icon dikhana hai isliye close wale ki display noe kra ke rakhi hai
  // and niche dono properties ka same kaam hai, agar 1 kaam nahi kiya toh doosra kr jayega
  .mobile-nav-icon[name="close-outline"] {
    display: none;
  }

  .close-outline {
    display: none;
  }

  .cart-trolley--link {
    position: relative;

    .cart-trolley {
      position: relative;
      font-size: 3.2rem;
    }

    .cart-total--item {
      width: 2.4rem;
      height: 2.4rem;
      position: absolute;
      background-color: #000;
      color: #000;
      border-radius: 50%;
      display: grid;
      place-items: center;
      top: -20%;
      left: 70%;
      background-color: ${({ theme }) => theme.colors.helper};
    }
  }

  .user-login--name {
    text-transform: capitalize;
  }

  .user-logout,
  .user-login {
    font-size: 1.4rem;
    padding: 0.8rem 1.4rem;
  }
  //handling menuicons in mobile view

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .mobile-navbar-btn {
      display: inline-block;
      z-index: 9999;
      border: ${({ theme }) => theme.colors.black};

      .mobile-nav-icon {
        font-size: 4.2rem;
        color: ${({ theme }) => theme.colors.black};
      }
    }

    //jab humne hamburger icon par click kiya toh active ho jayega nav-icon
    .active .mobile-nav-icon {
      //hamburger wale ko hide kar diya
      display: none;
      font-size: 4.2rem;
      position: absolute;
      //position for close icon
      top: 30%;
      right: 10%;
      color: ${({ theme }) => theme.colors.black};
      z-index: 9999;
    }
//close wale ko show kr diya
    .active .close-outline {
      display: inline-block;
    }

    .navbar-lists {
      //mobile me full screen pe show hoga navbar
      width: 100vw;
      height: 100vh;
      position: absolute;
      top: 0;
      left: 0;
      background-color: #fff;

      //to display them horizontally
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      visibility: hidden;
      opacity: 0;
      transform: translateX(100%);
      /* transform-origin: top; */
      transition: all 3s linear;
    }

    .active .navbar-lists {
      visibility: visible;
      opacity: 1;
      transform: translateX(0);
      z-index: 999;
      transform-origin: right;
      transition: all 3s linear;

      .navbar-link {
        font-size: 4.2rem;
      }
    }
    .cart-trolley--link {
      position: relative;

      .cart-trolley {
        position: relative;
        font-size: 5.2rem;
      }

      .cart-total--item {
        width: 4.2rem;
        height: 4.2rem;
        font-size: 2rem;
      }
    }

    .user-logout,
    .user-login {
      font-size: 2.2rem;
      padding: 0.8rem 1.4rem;
    }
  }
`;
  return (
    
    <Nav>
      {/* if menuicon value is true then div ill have class navbar and active lese only navbar */}
    <div className={menuIcon?"navbar active ": "navbar"}>
      <ul className='navbar-lists'>
        <li>
          <NavLink to="/" className="navbar-link" onClick={()=>setMenuIcon(false)}>Home</NavLink>
        </li>
        <li>
          <NavLink to="/about" className="navbar-link" onClick={()=>setMenuIcon(false)}>About</NavLink>
        </li>
        <li>
          <NavLink to="/products" className="navbar-link" onClick={()=>setMenuIcon(false)}>Products</NavLink>
        </li>
        <li>
          <NavLink to="/contact" className="navbar-link" onClick={()=>setMenuIcon(false)}>Contact</NavLink>
        </li>
        


   {isAuthenticated &&
   <p>{user.name}</p>
   }     
{/* login using AUTH0
 //if usr is authenticated show logout button else show login button */}

  {isAuthenticated ? (
  <li>
    <Button 
    onClick={() => logout({ logout: { returnTo: window.location.origin } })}>
      Log Out</Button>
      </li>
  ):(
   <Button onClick={() => loginWithRedirect()}>Log In</Button>
  )}

  



        <li>
          {/* cart-trolley--link class so that the total cart items no. appears on top corner of cart */}
          <NavLink to="/cart" className="navbar-link cart-trolley--link" onClick={()=>setMenuIcon(false)}>
{/* icon from react-icons library */} 
            <FiShoppingCart className="cart-trolley" />
            <span className='cart-total--item'>{total_item}</span>
          </NavLink>
        </li>
      </ul>

    {/* 2 buttons for open and close of menu in mobile view
      initially display:none so they are not visible */}
      <div className='mobile-navbar-btn'>
        {/* icons from react icons */}
        {/* handling icon states onclick */}
        <CgMenu className="mobile-nav-icon" name="menu-outline" onClick={()=>setMenuIcon(true)}/>
        <CgClose className="mobile-nav-icon close-outline" name="close-outline" onClick={()=>setMenuIcon(false)}/>
      </div>

    </div>

    </Nav>
    
  )
}

export default Nav