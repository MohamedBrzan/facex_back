import { Schema, model, Types } from 'mongoose';
import Hashtag from '../../Interfaces/Hashtag/Hashtag';

const hashtagSchema = new Schema<Hashtag>(
  {
    user: { type: Types.ObjectId, ref: 'User' },
    text: { type: String, required: true },
    followers: [{ type: Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

export default model('Hashtag', hashtagSchema);
