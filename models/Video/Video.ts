import { Schema, model, Types } from 'mongoose';
import Video from '../../Interfaces/Video/Video';

const videoSchema = new Schema<Video>(
  {
    user: { type: Types.ObjectId, ref: 'User' },
    video: { type: String, required: true },
    views: [{ type: Types.ObjectId, ref: 'User' }],
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
    ref: { type: Types.ObjectId, ref: 'Album' },
  },
  { timestamps: true }
);

export default model('Video', videoSchema);
