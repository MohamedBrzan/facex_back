import { Schema, model, Types } from 'mongoose';
import Notification from '../../Interfaces/Notification/Notification';
import NotificationStatus from '../../enums/NotificationStatus';

const notificationSchema = new Schema<Notification>(
  {
    from: { type: Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    link: { type: String, required: true },
    status: {
      type: String,
      enum: NotificationStatus,
      default: NotificationStatus.Read,
      required: true,
    },
  },
  { timestamps: true }
);

export default model('Notification', notificationSchema);
