const easyinvoice = require("easyinvoice");
const Order = require("../../models/user/order")
const Product = require("../../models/addproduct/addproduct")
const path = require('path')
const fs = require('fs')



const downloadInvoice = async (req, res) => {
    try {

        const orderId = req.query.orderId;
        
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        const productsData = await Promise.all(order.products.map(async item => {
            const product = await Product.findById(item.product);
            if (!product) {
                throw new Error(`Product not found for ID: ${item.product}`);
            }
            return {
                "quantity": item.quantity,
                "description": product.productname,
                "tax": 0,
                "price": product.price
            };
        }));
        const data = {
            "currency": "INR",
            "taxNotation": "vat",
            "marginTop": 25,
            "marginRight": 25,
            "marginLeft": 25,
            "marginBottom": 25,
            // "logo": "https://public.easyinvoice.cloud/img/logo_en_original.png",
            "sender": {
                "company": "SOULED STORE",
                "address": "Maradu Kochi",
                "zip": "680013",
                "city": "Kerala",
                "country": "India"
            },
            "client": {
                "company": order?.addresstoDeliver?.username,
                "address": order?.addresstoDeliver?.houseaddress,
                "zip": order?.addresstoDeliver?.state,
                "city": order?.addresstoDeliver?.phonenumber,
                "country": "INDIA"
            },
            "invoiceDate": order?.date?.toISOString(),
            "products": productsData,
            "total": order?.totalPrice,
        };
        const result =  await easyinvoice.createInvoice(data);
        console.log("created no api Error")
        const invoicesDir = path.join(__dirname, '../../', 'invoice');
        console.log('invoice directory:', invoicesDir);
        if (!fs.existsSync(invoicesDir)) {
            fs.mkdirSync(invoicesDir);
        }
        const filePath = path.join(invoicesDir, `invoice_${orderId}.pdf`);
        console.log('file path:', filePath);
         fs.writeFileSync(filePath, result.pdf, 'base64');
        // Send the file as a response
         await res.download(filePath, `invoice_${orderId}.pdf`);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to generate or download invoice' });  
    }
}
module.exports = {
    downloadInvoice
}
