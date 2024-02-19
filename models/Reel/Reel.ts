import { Schema, model, Types } from 'mongoose';
import Reel from '../../Interfaces/Reel/Reel';
import VisiblePrivacy from '../../enums/VisiblePrivacy';

const reelSchema = new Schema<Reel>(
  {
    user: { type: Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    image: [{ type: Types.ObjectId, ref: 'Image' }],
    video: [{ type: Types.ObjectId, ref: 'Video' }],
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
    views: [{ type: Types.ObjectId, ref: 'User' }],
    shares: [{ type: Types.ObjectId, ref: 'User' }],
    saves: [{ type: Types.ObjectId, ref: 'User' }],
    visiblePrivacy: {
      type: String,
      enum: VisiblePrivacy,
      required: true,
      default: VisiblePrivacy.public,
    },
  },
  { timestamps: true }
);

export default model('Reel', reelSchema);
