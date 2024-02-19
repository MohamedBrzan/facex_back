import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import Notification from '../../models/Notification/Notification';
import ErrorHandler from '../../middleware/ErrorHandler';
import User from '../../models/User/User';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    let notification = await Notification.findById(id);
    if (!notification)
      return next(
        new ErrorHandler(404, `Notification With Id: ${id} Not Exist`)
      );

    let user = await User.findById(req['authorizedUser']._id);

    const { notifications, followers, followings } = user;

    const notificationIndex = user.notifications.findIndex(
      (notification) => notification['_id'].toString() === id
    );

    if (notificationIndex >= 0) {
      notifications.splice(notificationIndex, 1);
      await user.save();
      await Notification.findByIdAndRemove(id);

      //! Delete This Notification From All Followers
      if (followers?.length > 0) {
        for (let i = 0; i < followers.length; i++) {
          const follower = await User.findById(followers[i].toString()).select(
            'notification'
          );
          follower?.notifications?.filter((n) => n['_id'].toString() !== id);
          await follower.save();
        }
      }

      //! Delete This Notification From All Followings
      if (followings?.length > 0) {
        for (let i = 0; i < followings.length; i++) {
          const following = await User.findById(
            followings[i].toString()
          ).select('notification');
          following?.notifications?.filter((n) => n['_id'].toString() !== id);
          await following.save();
        }
      }

      return res
        .status(200)
        .json({ success: true, msg: 'Notification Deleted Successfully' });
    }

    return res.status(404).json({
      success: false,
      message: "Sorry!!, You're Not The Owner Of This Notification",
    });
  }
);
