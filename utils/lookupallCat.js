
const products = require("../models/addproduct/addproduct")

async function lookupAllCategory(from, localField, foreignField){
try {
    const fcat =  await products.aggregate([
    
           {$lookup: {
                from: from,
                localField: localField,
                foreignField: foreignField,
                as:"newcat"
            } 
        },
        {$match:
        {
           $and:[
            {"newcat.isActive": true},
            {isActive : true}
           ] 
        }}
           
    ])
    console.log(fcat)   
    return fcat
} catch (error) {
    console.log(error.message);
}

}
module.exports ={
    lookupAllCategory,
};
