import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import Notification from '../../models/Notification/Notification';
import User from '../../models/User/User';
import ErrorHandler from '../../middleware/ErrorHandler';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, link, status } = req.body;
    let notification = await Notification.create({
      from: req['authorizedUser']._id,
      title,
      link,
      status,
    });

    let user = await User.findById(req['authorizedUser']._id);

    if (!user) {
      await Notification.findByIdAndRemove(notification['_id']);
      return next(
        new ErrorHandler(404, `User With Id ${req['authorizedUser']._id} Not Exist`)
      );
    }

    await User.findByIdAndUpdate(
      req['authorizedUser']._id,
      { $push: { notifications: notification['_id'].toString() } },
      { runValidators: true, new: true }
    );

    const { followers, followings } = user;

    //* Send This Notification From All Followers
    if (followers?.length > 0) {
      for (let i = 0; i < followers.length; i++) {
        await User.findByIdAndUpdate(
          followers[i].toString(),
          {
            $push: {
              notifications: notification['_id'],
            },
          },
          { runValidators: true, new: true }
        );
      }
    }

    //* Send This Notification From All Followings
    if (followings?.length > 0) {
      for (let i = 0; i < followings.length; i++) {
        await User.findByIdAndUpdate(
          followings[i].toString(),
          {
            $push: {
              notifications: notification['_id'],
            },
          },
          { runValidators: true, new: true }
        );
      }
    }

    return res.status(200).json(notification);
  }
);
