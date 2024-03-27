import mongoose from 'mongoose';

const requestSchema = mongoose.Schema(
  {
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: true
    },
    state: {
      type: String,
      required: true,
      enum: ['pending', 'assisting', 'complete']
    },
    tableNum: {
      type: Number,
      required: true,
    },
    requestedBill: {
      type: Boolean,
      required: true,
    }
  }
);
  
// Pre-save middleware: Hash the password (similar to what you did for users)
requestSchema.pre('save', async function (next) {
    
    next();
});

const Request = mongoose.model('Request', requestSchema);
  
export default Request;