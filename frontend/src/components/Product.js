import React from 'react'
import {NavLink} from 'react-router-dom';
import FormatPrice from '../helpers/FormatPrice';

const Product = (curElem) => {
  // destructuring the curElem
  const{id,name,image,price,category} =curElem;
  return (

    // this card is for 1 product ,since we re looping over the array therefore 1st this whole thing will run for 1st product,then for 2nd and then for 3rd
    <NavLink to={`/singleProduct/${id}`}>
<div className='card'>
  {/*using figure to show image and isme hume caption bhi milta hai */}
  <figure>
    <img src={image} alt={name} />
    <figcaption className="caption">
     {category}
    </figcaption>
    </figure>
    <div className='card-data'>
   <div className='card-data-flex'>
    <h3>{name}</h3>
    <p className='card-data--price'>
      {<FormatPrice price={price} />}
    </p>
   </div>
    </div>
  
</div>
    </NavLink>
  );
}

export default Product