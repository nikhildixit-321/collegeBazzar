const product = require('../models/products')

const getAllProducts = async (req,res)=>{
  // const myData = await product.find(req.query).sort("name price");
  const {company,name,featured,sort,select,image} = req.query;

  const queryObject = { };
  if(company){
    queryObject.company = company;
  }
  if(image){
    queryObject.image = image;
  }
  if(name){
    queryObject.name = {$regex:name,$options:"i"};
  }
  if(featured){
    queryObject.featured = featured;
  }

  
  let apiData  = product.find(queryObject);

  if(sort){
    let sortFix = sort.replace(","," ")
   apiData = apiData.sort(sortFix);
  }
  if(select){
    // let selectFix = select.replace(","," ")
    let selectFix = select.split(",").join(" ");
   apiData = apiData.select(selectFix);
  }
  let page =Number(req.query.page)||1;
  let limit =Number(req.query.limit)||3;
  let skip = (page-1)*limit;
  apiData = apiData.skip(skip).limit(limit);

const myData = await apiData;
  res.status(200).json({myData,nbHits:myData.length}) 
};
  

const getAllProductsTesting = async (req,res)=>{
  const myData = await product.find(req.query).sort("name price");
  res.status(200).json({myData}) 
  };
    module.exports = {
        getAllProducts,getAllProductsTesting
    }