import { Schema, model, Types } from 'mongoose';
import Post from '../../Interfaces/Post/Post';
import PostStatus from '../../enums/PostStatus';
import VisiblePrivacy from '../../enums/VisiblePrivacy';

const PostSchema = new Schema<Post>(
  {
    images: [{ type: String }],
    videos: [{ type: String }],
    content: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: {
      type: String,
      enum: PostStatus,
      default: PostStatus.Active,
      required: true,
    },
    comments: [{ type: Types.ObjectId, ref: 'Comment' }],
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
    shares: [{ type: Types.ObjectId, ref: 'User' }],
    saves: [{ type: Types.ObjectId, ref: 'User' }],
    visiblePrivacy: {
      type: String,
      enum: VisiblePrivacy,
      default: VisiblePrivacy.public,
      required: true,
    },
  },
  { timestamps: true }
);

export default model('Post', PostSchema);
