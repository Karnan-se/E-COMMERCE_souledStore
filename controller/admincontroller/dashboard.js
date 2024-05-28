const Product = require("../../models/addproduct/addproduct")
const Orders= require("../../models/user/order")
const customers = require("../../models/user/userdetails");
const Order = require("../../models/user/order")





let admindashboard = async(req, res)=>{
    try {
        const TotalConsumers = await customers.aggregate([{$match:{}},{$count:"total"}])
        console.log(TotalConsumers)
        const TotalProduct = await Product.aggregate([{$match:{}},{$count:"Total"}])
        console.log(TotalProduct)
        const totalOrders = await Orders.aggregate([{$match:{}},{$count:"Total"}])
        console.log(totalOrders);
        const TotalEarnings = await Orders.aggregate([{$match:{paymentStatus:"PaymentRecieved"}},{$group:{_id:null, sum:{$sum:"$totalAmount"}}}])
        console.log(TotalEarnings)

        res.render("admin/dashboard.ejs",{TotalConsumers,TotalProduct,totalOrders,TotalEarnings})

    } catch (error) {
        console.log(error);
        
    }
}


const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
const sales = async (req, res) => {
    try {
      const { timeframe } = req.query;
      let startDate, endDate;
  
      if (timeframe === 'weekly') {
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 6); 
        endDate = new Date();
      } else if (timeframe === 'monthly') {
        startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 1); 
        endDate = new Date();
      } else if (timeframe === 'yearly') {
        endDate = new Date();
        startDate = new Date(endDate.getFullYear(), 0, 1);
      } else {
        return res.status(400).json({ error: 'Invalid timeframe' });
      }
  
      const orders = await Order.find({
        date: { $gte: startDate, $lte: endDate },
        paymentStatus: 'PaymentRecieved'
      });
    
      
      const salesData = {};
      if (timeframe === 'weekly') {
        for (let i = 0; i < 7; i++) {
          const date = formatDate(new Date(startDate.getTime() + (i * 24 * 60 * 60 * 1000)));
          salesData[date] = 0;
        }
      } else if (timeframe === 'monthly') {
        for (let i = 0; i < 30; i++) {
          const date = formatDate(new Date(startDate.getTime() + (i * 24 * 60 * 60 * 1000)));
          salesData[date] = 0;
        }
      }else if (timeframe === 'yearly') {
        for (let i = 0; i < 12; i++) {
          const monthStartDate = new Date(startDate.getFullYear(), i, 1);
          const monthEndDate = new Date(startDate.getFullYear(), i + 1, 1);
          const monthSales = orders.filter(order => order.date >= monthStartDate && order.date <= monthEndDate);
          const monthTotalSales = monthSales.reduce((total, order) => total + order.totalAmount, 0);
          salesData[monthStartDate.toISOString()] = monthTotalSales;
        }
      }
      orders.forEach(order => {
        const date = formatDate(order.date);
        salesData[date] += order.totalAmount;
      });
      const labels = Object.keys(salesData).map(date => formatDate(new Date(date)));
      const values = Object.values(salesData);
      console.log(labels,values);
      res.json({ labels, values });
    } catch (error) {
      console.error('Error fetching sales:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  async function chart() {
    try {
      const ordersPie = await Order.find()
      const ordersCount = {
        cashOnDelivery: 0,
        razorPay: 0,
        wallet: 0
      }
      const paymentMethod = {
        cashOnDelivery:'Cash on delivery',
        razorPay:'RazorPay',
        wallet :'Wallet'
      }
      ordersPie.forEach((order) => {
        if (order.paymentMethod === paymentMethod.cashOnDelivery) {
          ordersCount.cashOnDelivery++
        } else if (order.paymentMethod === paymentMethod.razorPay) {
          ordersCount.razorPay++
        } else if (order.paymentMethod === paymentMethod.wallet) {
          ordersCount.wallet++
        }
      })
  
      return ordersCount;
    } catch (error) {
      console.log("An error occured in orders count function chart", error.message);
    }
  }
  const fetchDashboard = async (req, res, next) => {
    try {
      const users = await customers.find().exec();
      const orders = await Order.find().exec();
      const products = await Product.find().exec();
      const ordersPie = await chart();

      res.json({
        users: users,
        orders: orders,
        products: products,
        ordersPie: ordersPie,
      });
    } catch (err) {
      next(err);
    }
  }

module.exports ={
    admindashboard,
    sales,
    fetchDashboard,
}