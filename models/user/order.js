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
            coupon:{
                type:String,
                required:false,
                default:0,
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
                   isOrderCancelled :{
                    type:Boolean,
                    default:false
                   },
                   isOrderReturned :{
                    type:Boolean,
                    default:false
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
            paymentStatus:{
                type:String,
                default:"pending",
                required:false,

            },
            isOrderPlaced:{
                type:String,
                default:false,
                required:false,
            }
        });


        order.methods.formateDate = function () {
            return format(this.date, 'dd-MM-yyyy')
        }
        order.pre("save", function(next){
            const randomNum = Math.floor(100000 +Math.random()* 90000)
            this.orderID=`ORD${randomNum}`;
            next()
        })


        module.exports = mongoose.model('Order',order);