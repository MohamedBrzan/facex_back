import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import Ad from '../../models/Ad/Ad';
import ErrorHandler from '../../middleware/ErrorHandler';
import User from '../../models/User/User';
import Payment from '../../models/Payment/Payment';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { images, videos, start, end, tags, ages, payment } = req.body;

    const findPayment = await Payment.findById(payment);

    if (!findPayment)
      return next(
        new ErrorHandler(404, `Couldn't Find Payment With Id: ${payment}`)
      );

    const ad = await Ad.create({
      user: req['authorizedUser']._id,
      images,
      videos,
      start,
      end,
      tags,
      ages,
      payment,
    });

    let user = await User.findById(req['authorizedUser']._id);

    if (!user) {
      await Ad.findByIdAndRemove(ad['_id']);
      return next(
        new ErrorHandler(404, `User With Id ${req['authorizedUser']._id} Not Exist`)
      );
    }

    await User.findByIdAndUpdate(req['authorizedUser']._id, {
      $push: {
        ads: ad['_id'],
      },
    });

    res.status(200).json(ad);
  }
);
