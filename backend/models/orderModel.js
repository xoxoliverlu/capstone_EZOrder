import mongoose from 'mongoose';

const orderSchema = mongoose.Schema(
  {
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: true
    },
    tableNum: {
      type: Number,
      required: true
    },
    items: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CartItem',
    }],
    time: {
      type: Date,
      required: true
    },
    serveTime: {
      type: Date,
    },
    state: {
      type: String,
      required: true,
      enum: ['pending', 'preparing', 'serve', 'serving', 'served']
    },
    orderNum: {
      type: Number,
      required: true
    }
  }
);
  
// Pre-save middleware
orderSchema.pre('save', async function (next) {
    next();
});

const Order = mongoose.model('Order', orderSchema);
  
export default Order;