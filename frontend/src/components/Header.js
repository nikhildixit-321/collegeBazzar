import React from 'react'
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';//navlink has functionality that page don't get reloaded when we click on link text like it gets reloaded in case on <a> tag.
import Nav from './Nav.js';

const Header = () => {
  // mainheader is a styled compoennt working like header
  return(
     <MainHeader>


    <NavLink to="/">
<img src='./images/Logo.png' alt="logo" className='logo'/>
    </NavLink>

    <Nav />
  </MainHeader> 
  );
}


const MainHeader=styled.header`
padding:0 4.8rem;
height:8rem;
background-color: ${({theme})=> theme.colors.bg};
display:flex;
justify-content:space-between;
align-items:center;
position:relative;

.logo{
  height:4rem;
  
}

`;

export default Header