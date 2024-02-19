import { Schema, model, Types } from 'mongoose';
import Album from '../../Interfaces/Album/Album';

const albumSchema = new Schema<Album>(
  {
    user: { type: Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    description: { type: String },
    images: [{ type: Types.ObjectId, ref: 'Image' }],
  },
  { timestamps: true }
);

export default model('Album', albumSchema);
