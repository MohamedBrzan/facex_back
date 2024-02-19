import { Schema, model, Types } from 'mongoose';
import Comment from '../../Interfaces/Comment/Comment';
import VisiblePrivacy from '../../enums/VisiblePrivacy';

const commentSchema = new Schema<Comment>(
  {
    user: { type: Types.ObjectId, ref: 'User' },
    message: { type: String, required: true },
    ref: {
      post: { type: Types.ObjectId, ref: 'Post' },
      blog: { type: Types.ObjectId, ref: 'Blog' },
      reel: { type: Types.ObjectId, ref: 'Reel' },
    },
    replies: [{ type: Types.ObjectId, ref: 'Reply' }],
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

export default model('Comment', commentSchema);
