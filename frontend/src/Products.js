import React from "react";
import styled from "styled-components";
import FilterSection from "./components/FilterSection";
import ProductList from "./components/ProductList";
import Sort from "./components/Sort";



const Products = () => {

 
  
  return( <Wrapper>
    {/* we haven't used grid-2-column because i n that both columns get equal width but here 1st col-less width(20%), 2nd col-more width(80%),thats why grid-filter-column class */}
<div className="container grid grid-filter-column">
  {/*1st coloumn- filter section*/}
  <div>
    <FilterSection />
  </div>
{/* 2nd column- sort & product view  */}
<section className="product-view--sort">
  {/* 2nd col 1st row -sort */}
  <div className="sort-filter">
    <Sort />
  </div>
{/* 2nd col 2nd row -products */}
<div className="main-product">
<ProductList />
</div>

</section>
</div>
  </Wrapper>
  );
};

const Wrapper = styled.section`
  .grid-filter-column {
    grid-template-columns: 0.2fr 1fr;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .grid-filter-column {
      grid-template-columns: 1fr;
    }
  }
`;

export default Products;
