import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import Image from '../../models/Image/Image';
import ErrorHandler from '../../middleware/ErrorHandler';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    let image = await Image.findById(id);
    if (!image)
      return next(new ErrorHandler(404, `Image With Id ${id} Not Exist`));

    image = await Image.findByIdAndUpdate(id, req.body, {
      runValidators: true,
      new: true,
    });
    return res.status(200).json(image);
  }
);
