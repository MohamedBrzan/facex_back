import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import Album from '../../models/Album/Album';
import User from '../../models/User/User';
import ErrorHandler from '../../middleware/ErrorHandler';
import { getUserId } from '../../constants/UserId';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = (await getUserId(req)).toString();

    const { title, description, images } = req.body;

    let album = await Album.create({
      user: userId,
      title,
      description,
      images,
    });

    await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          albums: album._id,
        },
      },
      { runValidators: true, new: true, upsert: true }
    );

    return res.status(200).json(album);
  }
);
