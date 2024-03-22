const mongoose = require('mongoose');
const {format} = require('date-fns')
   

        const order = new mongoose.Schema({
            orderID:{
                type:String,
                required:false,
            },
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user',
                required: true
            },
            date: {
                type: Date,
                default: new Date(),
                required: false,
            },
            totalAmount: {
                type: Number,
                required: true
            },
            paymentMethod: {
                type: String,
                required:false,
            },
            products: [{
                product:{
                    type:  mongoose.Schema.Types.ObjectId,
                    ref: "addproduct",
                    required: true,
                   },
                   size:{
                    type: String,
                    required: false,
                   },
                   quantity:{
                    type:Number,
                    default:1,
                    required:false,
                
                   },
                   price:{
                    type:Number,
                    default:0,
                    required:false,
                   },

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
            isOrderPlaced:{
                type:Boolean,
                default:false,
                required:false,
            }
        });


        order.methods.formateDate = function () {
            return format(this.date, 'dd-MM-yyyy')
        }


        module.exports = mongoose.model('Order',order);