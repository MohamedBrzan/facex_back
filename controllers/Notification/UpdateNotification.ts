import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import Notification from '../../models/Notification/Notification';
import ErrorHandler from '../../middleware/ErrorHandler';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    let notification = await Notification.findById(id);
    if (!notification)
      return next(
        new ErrorHandler(404, `Notification With Id: ${id} Not Exist`)
      );

    notification = await Notification.findByIdAndUpdate(id, req.body, {
      runValidators: true,
      new: true,
    });

    return res.status(200).json(notification);
  }
);
