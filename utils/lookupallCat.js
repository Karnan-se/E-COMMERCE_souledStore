
const products = require("../models/addproduct/addproduct")

async function lookupAllCategory(from, localField, foreignField,productId){
try {
    const fcat =  await products.aggregate([
    
           {$lookup: {
                from: from,
                localField: localField,
                foreignField: foreignField,
                as:"newcat"
            } 
        },
        
    
    
    ])
    
    return fcat
} catch (error) {
    console.log(error.message);
}

}
module.exports ={
    lookupAllCategory
};
