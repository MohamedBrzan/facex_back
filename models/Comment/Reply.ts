import { Schema, model, Types } from 'mongoose';
import Reply from '../../Interfaces/Comment/Reply';
import VisiblePrivacy from '../../enums/VisiblePrivacy';

const replySchema = new Schema<Reply>(
  {
    user: { type: Types.ObjectId, ref: 'User' },
    ref: { type: Types.ObjectId, ref: 'Comment' },
    reply: { type: String, required: true },
    expressions: {
      like: [{ type: Types.ObjectId, ref: 'User' }],
      love: [{ type: Types.ObjectId, ref: 'User' }],
      support: [{ type: Types.ObjectId, ref: 'User' }],
      sad: [{ type: Types.ObjectId, ref: 'User' }],
      happy: [{ type: Types.ObjectId, ref: 'User' }],
      angry: [{ type: Types.ObjectId, ref: 'User' }],
      disgust: [{ type: Types.ObjectId, ref: 'User' }],
      surprise: [{ type: Types.ObjectId, ref: 'User' }],
      fear: [{ type: Types.ObjectId, ref: 'User' }],
    },
    visiblePrivacy: {
      type: String,
      enum: VisiblePrivacy,
      required: true,
      default: VisiblePrivacy.public,
    },
  },
  { timestamps: true }
);

export default model('Reply', replySchema);
