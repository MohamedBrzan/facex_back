import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import ErrorHandler from '../../middleware/ErrorHandler';
import Reel from '../../models/Reel/Reel';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const reel = await Reel.findById(id);
    if (reel) return res.json(reel);
    return next(new ErrorHandler(404, `Couldn't Find ${id}`));
  }
);
