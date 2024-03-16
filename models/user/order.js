const mongoose = require('mongoose');
        const Product=require('./productModel')
        const User=require('./user_model')

        const order = new mongoose.Schema({
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            date: {
                type: Date,
                default: new Date(),
                required: true
            },
            totalAmount: {
                type: Number,
                required: true
            },
            paymentMethod: {
                type: String
            },
            products: [{
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'product',
                    required: true
                },
                price: {
                    type: Number,
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true
                }
            }],
            addresstoDeliver:{
                username:String,
                phonenumber:Number,
                houseaddress:String,
                state:String,
                district:String,
                city:String,
                

            },
            orderStatus:{
                type:String,
                default: "Pending"
            },
            deliveredDate:{
                type:Date,
                default:''
            },
            couponDiscount:{
                type:Number,
                default:0,
            },
        });


        module.exports = mongoose.model('Order',order);