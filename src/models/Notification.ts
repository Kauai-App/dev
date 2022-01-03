import { INotification } from '../interfaces/INotification';
import mongoose from 'mongoose';

const Notification = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: [true, 'user id is a required field']
    }
  },
  
  { timestamps: true },
);

export default mongoose.model<INotification & mongoose.Document>('Notification', Notification);
