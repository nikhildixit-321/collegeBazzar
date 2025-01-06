import styled from "styled-components";
import { useState } from "react";
//img ek array hai [],uske andar url ko empty set kr do
// agar kuch nahi ho rha hai to uskho ye default value mil jayegi
const MyImage = ({img=[{url: ""}]}) => {

  //state for changing main screen image
  const[mainImage,setMainImage]=useState(img[0]);
  return (
    <Wrapper>
      {/* 1st column */}
  <div className="grid grid-four-column">
    {/* img will be an array we will loop over it */}
 {img.map((curElem,index)=>{
return(
  <figure>
    <img src={curElem.url}
    alt={curElem.filename}
    className="box-image--style"
    key={index}
    onClick={()=>setMainImage(curElem)}
    />
  </figure>
);
 })}
</div>

 {/* 2nd column */}
 <div className="main-screen">
  {/* img[0].url will give error, therefor while destructing we have to give it a default value */}
  <img src={mainImage.url} alt={mainImage.filename} />
 
  </div>
    </Wrapper>
  );
};


const Wrapper = styled.section`
  display: grid;
  grid-template-columns: 0.4fr 1fr;
  gap: 1rem;

  .grid {
    flex-direction: row;
    justify-items: center;
    align-items: center;
    width: 100%;
    gap: 1rem;
    /* order: 2; */

    img {
      max-width: 100%;
      max-height: 100%;
      background-size: cover;
      object-fit: contain;
      cursor: pointer;
      box-shadow: ${({ theme }) => theme.colors.shadow};
    }
  }

  .main-screen {
    display: grid;
    place-items: center;
    order: 1;
    img {
      max-width: 100%;
      height: auto;
      box-shadow: ${({ theme }) => theme.colors.shadow};
    }
  }
  .grid-four-column {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    display: flex;
    flex-direction: column;
    order: 1;

    .grid-four-column {
      grid-template-rows: 1fr;
      grid-template-columns: repeat(4, 1fr);
    }
  }
`;

export default MyImage