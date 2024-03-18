import mongoose from 'mongoose';

const requestSchema = mongoose.Schema(
  {
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: true
    },
    table: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Table',
    },
    state: {
      type: String,
      required: true,
      enum: ['pending', 'assisting']
    }
  }
);
  
// Pre-save middleware: Hash the password (similar to what you did for users)
requestSchema.pre('save', async function (next) {
    
    next();
});

const Request = mongoose.model('Request', requestSchema);
  
export default Request;