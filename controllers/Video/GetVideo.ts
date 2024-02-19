import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import Video from '../../models/Video/Video';
import ErrorHandler from '../../middleware/ErrorHandler';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    let video = await Video.findById(id);
    if (!video)
      return next(new ErrorHandler(404, `Video With Id ${id} Not Exist`));
    return res.status(200).json(video);
  }
);
