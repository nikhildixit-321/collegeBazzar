
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import {Button} from '../styles/Button';

const HeroSection = ({myData}) => {
  // destructuring myData as name which we will get as a prop from homepage and about page aand using it as a heading
  const {name}=myData;
  return (
     <Wrapper>
      {/* we have made a container and inside it we will make 2 grids */}
      <div className='container'>
        <div className='grid grid-two-column'>
{/* data */}
         <div className='hero-section-data'>
          <p className='intro-data'>Welcome to</p>
{/* using name as a heading */}
          <h1>{name}</h1>
          <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
              atque temporibus veniam doloribus libero ad error omnis voluptates
              animi! Suscipit sapiente.
          </p>

          <NavLink to="/products">
            {/* button component */}
        <Button>
        shop now
        </Button>
          </NavLink>
         </div>

         {/* our homepage image */}
         <div className='hero-section-image'>
          <figure>
            <img src="/images/hero.jpg" alt="hero-section" className="img-style" />
          </figure>
         </div>
        </div>
      </div>
     </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 12rem 0;

  img {
    min-width: 10rem;
    height: 10rem;
  }

  .hero-section-data {
    p {
      margin: 2rem 0;
    }

    h1 {
      text-transform: capitalize;
      font-weight: bold;
    }

    .intro-data {
      margin-bottom: 0;
    }
  }

  .hero-section-image {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  figure {
    position: relative;

    &::after {
      content: "";
      width: 60%;
      height: 80%;
      background-color: rgba(81, 56, 238, 0.4);
      position: absolute;
      left: 50%;
      top: -5rem;
      z-index: -1;
    }
  }
  .img-style {
    width: 100%;
    height: auto;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .grid {
      gap: 10rem;
    }

    figure::after {
      content: "";
      width: 50%;
      height: 100%;
      left: 0;
      top: 10%;
      /* bottom: 10%; */
      background-color: rgba(81, 56, 238, 0.4);
    }
  }
`;

export default HeroSection