import { Schema, model, Types } from 'mongoose';
import Image from '../../Interfaces/Image/Image';

const imageSchema = new Schema<Image>(
  {
    user: { type: Types.ObjectId, ref: 'User', required: true },
    image: { type: String, required: true },
    ref: { type: Types.ObjectId, ref: 'Album', required: true },
  },
  { timestamps: true }
);

export default model('Image', imageSchema);
