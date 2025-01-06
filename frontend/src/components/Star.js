import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";
import styled from "styled-components";

const Star = ({star,review}) => {
//we have to show rating out of 5 thats why we have taken array of length 5
  const ratingStar=Array.from({length:5},(elem,index)=>{
    let number = index +0.5;//for half star

    return (
      //we wil do comparision and show stars based on that
      // index-0,1,2,3,4
      //number-0.5,1.5,2.5,3.5,4.5
      //ex - star-4.4
      //1st loop- 4.4>=0+1 - full star
      // 2nd loop- 4.4 => 1+1 -full star
      // 3rdloop 4.4 >= 2+1 -full star
      // 4th loop 4.4 >= 3+1 -full star
      // 5th loop 4.4>=4 +1 - false ,therefore 4.4>=number(4+0.5)-false ,therefore outline iocn will be shown
      // therefore - for 4.4 star - 4full and 1 empty star will bbe shown
      <span key={index}>
        {star >=index + 1 ? <FaStar className="icon" />
         : star >= number ? <FaStarHalfAlt className="icon"/>
         : <AiOutlineStar className="icon"/>}
      </span>
    );

  });

 return (
<Wrapper>
 <div className="icon-style">
  {ratingStar}
  <p>
    ({review} customer reviews)
  </p>
 </div>
</Wrapper>
 )
};

const Wrapper = styled.section`
  .icon-style {
    display: flex;
    gap: 0.2rem;
    align-items: center;
    justify-content: flex-start;

    .icon {
      font-size: 2rem;
      color: orange;
    }

    .empty-icon {
      font-size: 2.6rem;
    }
    p {
      margin: 0;
      padding-left: 1.2rem;
    }
  }
`;


export default Star