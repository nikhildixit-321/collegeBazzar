import React from 'react';
import FeatureProduct from './components/FeatureProduct';
import HeroSection from './components/HeroSection';
import Services from './components/Services';
import Trusted from './components/Trusted';


const Home = () => {
  const data={
    name:"collegeBazzar",
  };
  
  return (
    //we have used fragment because it is giving error, because we should have 1 parent component in react but here we have 3,therefore used fragments.
    <>
    <HeroSection myData={data}/>
    <FeatureProduct />
    <Services />
    <Trusted /> 
    </>
  );
  
}



export default Home