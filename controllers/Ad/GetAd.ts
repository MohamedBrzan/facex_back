import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import Ad from '../../models/Ad/Ad';
import ErrorHandler from '../../middleware/ErrorHandler';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const ad = await Ad.findById(id);
    if (!ad) return next(new ErrorHandler(404, `Ad With Id : ${id} Not Exist`));
    res.status(200).json(ad);
  }
);
