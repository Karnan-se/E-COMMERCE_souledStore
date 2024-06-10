
const Order = require("../../models/user/order")







// let bestsellingProduct= async(req, res)=>{
//     try {
//         console.log("worked")
        
//        const products = await orders.aggregate([ {$group:{_id:"$products.product", sum:{$sum:1}}},{$sort:{_id:1}},
//         {$lookup:{
//             from:"addproduct",
//             localField:"_id",
//             foreignField:"_id",
//             as:"NewProduct"

//         }}
//        ])
//        console.log(products)
//        products.NewProduct.forEach((item)=>{
//         console.log(item)
//        })




//         res.render("admin/bestSellingProduct.ejs",{products})
        
//     } catch (error) {
        
//     }
// }

const bestsellingProduct = async(req,res)=>{
    try {

        const bestSellingProducts = await Order.aggregate([
           {$unwind:"$products"},
           {
            $group:
            {_id:"$products.product",
            totalQuantity:{
                $sum:"$products.quantity"
            }
        }
    },
    { $sort:{totalQuantity:-1} },
    {$limit:10},
    {
        $lookup:{
           from:"addproducts",
           localField:"_id",
           foreignField:"_id",
           as:"product" 
        }
    },
    {$unwind:"$product"},
    {
        $project:{
            _id:0,
            productId:"$_id",
            productName:"$product.productname",
            totalQuantity:1
        }
    }
        ])

        console.log( bestSellingProducts);
        return  res.render('admin/bestSellingProduct.ejs',{products:bestSellingProducts})
        
    } catch (error) {
        res.status(500).json({ error: 'Failed to find products' });  

      }
  }









  const bestSellingCategory = async (req, res) => {
    try {
        const bestCategories = await Order.aggregate([
            { $unwind: "$products" },
            {
                $lookup: {
                    from: "addproducts",
                    localField: "products.product",
                    foreignField: "_id",
                    as: "productDetails"
                }
            },
            { $unwind: "$productDetails" },
            {
                $group: {
                    _id: "$productDetails.category",
                    totalQuantity: { $sum: "$products.quantity" }
                }
            },
            { $sort: { totalQuantity: -1 } },
            { $limit: 10 },
            {
                $lookup: {
                    from: 'categories',
                    localField: "_id",
                    foreignField: "_id",
                    as: "categoryDetails"
                }
            },
            { $unwind: "$categoryDetails" },
            {
                $project: {
                    _id: 0,
                    categoryId: "$_id",
                    categoryname: "$categoryDetails.categoryname",
                    totalQuantity: 1
                }
            }
        ]);

        console.log(bestCategories, "hello");
        return res.render('admin/bestSellingCategory.ejs', { categories: bestCategories });
    } catch (error) {
        console.error('Error fetching best-selling categories:', error);
        res.status(500).json({ error: 'Failed to find categories' });
 }
};

module.exports ={
    bestsellingProduct,
    bestSellingCategory
}