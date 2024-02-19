import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import Album from '../../models/Album/Album';
import ErrorHandler from '../../middleware/ErrorHandler';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    let album = await Album.findById(id);
    if (!album)
      return next(new ErrorHandler(404, `Album With Id ${id} Not Exist`));
    return res.status(200).json(album);
  }
);
