import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import ErrorHandler from '../../middleware/ErrorHandler';
import User from '../../models/User/User';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    let user = await User.findById(id);
    if (!user)
      return next(new ErrorHandler(404, `Couldn't Find User With Id => ${id}`));

    user = await User.findByIdAndUpdate(id, req.body, {
      runValidators: true,
      new: true,
    });
    return res.json(user);
  }
);
